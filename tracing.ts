import { SimpleSpanProcessor, NodeTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { Instrumentation } from '@opentelemetry/instrumentation';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';

export const initTracing = async () => {
  const exporter = new OTLPTraceExporter({
    url: `http://${process.env.OTLP_HOST}:${process.env.OTLP_PORT}/v1/traces`,
  });

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: process.env.OTLP_SERVICE_NAME,
    }),
  });

  const IS_PRODUCTION = process.env.NODE_ENV.toLowerCase().startsWith('prod');
  const SpanProcessor = IS_PRODUCTION ? BatchSpanProcessor : SimpleSpanProcessor;

  if (IS_PRODUCTION)
    provider.addSpanProcessor(new SpanProcessor(new ZipkinExporter({ url: process.env.ZIPKIN_URL })));
  // export spans to opentelemetry collector
  else provider.addSpanProcessor(new SpanProcessor(exporter));

  const instrumentations: Instrumentation[] = [new ExpressInstrumentation(), new NestInstrumentation()];

  instrumentations.push(new HttpInstrumentation());

  provider.register();
  const sdk = new NodeSDK({
    traceExporter: exporter,
    instrumentations: [...instrumentations, getNodeAutoInstrumentations()],
  });

  try {
    await sdk.start();

    console.log('Tracing initialized');

    process.on('SIGTERM', async () => {
      try {
        await sdk.shutdown();

        console.log('Tracing terminated');
      } catch (error) {
        console.log('Error terminating tracing', error);
      } finally {
        process.exit(0);
      }
    });
  } catch (error) {
    console.log('Error initializing tracing', error);
  }
};

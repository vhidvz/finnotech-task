import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

export function SMTP_CONFIG(
  defaults: MailerOptions['defaults'] = { from: '"No Reply" <no-reply@wenex.org>' },
): MailerOptions {
  const user = process.env.MAIL_USERNAME;
  const pass = process.env.MAIL_PASSWORD;

  const port = +(process.env.MAIL_PORT ?? '587');
  const host = process.env.MAIL_HOST ?? 'localhost';

  const secure = process.env.MAIL_SECURE?.toLowerCase().includes('true');

  return {
    defaults,
    transport: { host, port, secure, auth: user && pass ? { user, pass } : undefined },
  };
}

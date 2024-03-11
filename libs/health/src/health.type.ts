export type Check = 'disk' | 'memory' | 'mysql' | 'redis';

export type HealthCheckOptions = (
  | {
      [key in Check]?:
        | {
            key?: string;
            options?: any;
            service?: string; // grpc
          }
        | undefined
        | null;
    }
  | Check
)[];

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

export class Logger {
  private level: LogLevel = 'info';

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  private shouldLog(target: LogLevel): boolean {
    const order: Record<LogLevel, number> = {
      debug: 1,
      info: 2,
      warn: 3,
      error: 4,
      silent: 5
    };
    return order[target] >= order[this.level];
  }

  private write(level: string, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    const line = `[${timestamp}] [NexusForge] [${level}] ${message}${metaStr}\n`;
    process.stderr.write(line);
  }

  public debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) this.write('DEBUG', message, meta);
  }

  public info(message: string, meta?: any): void {
    if (this.shouldLog('info')) this.write('INFO', message, meta);
  }

  public warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) this.write('WARN', message, meta);
  }

  public error(message: string, meta?: any): void {
    if (this.shouldLog('error')) this.write('ERROR', message, meta);
  }
}

export const logger = new Logger();

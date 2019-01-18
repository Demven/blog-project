import { ErrorHandler } from '@angular/core';
import { env } from '../../environments';

interface Logger {
  captureException(error: any): Promise<any>;
}

export class ErrorLogger implements ErrorHandler {
  private initialized = false;
  private logger: Logger;

  static initWith(sentry: any, dsn: string) {
    return () => new ErrorLogger(sentry, dsn);
  }

  constructor(private SentryClient: any, private dsn: string) {
    this.initialize = this.initialize.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  initialize() {
    this.logger = new this.SentryClient({ dsn: this.dsn });

    this.initialized = true;
  }

  handleError(error: any): void {
    if (env.NODE_ENV === 'production') {
      if (!this.initialized) {
        this.initialize();
      }

      this.logger.captureException(error.originalError || error);

      console.error('ErrorLogger caught error:', error.message);
    } else {
      throw error; // for default behaviour rather than silently dying
    }
  }
}

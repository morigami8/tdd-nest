import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '../../logger/logger.service';

interface IError {
  message_content: string;
  code_error: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const pathUrl = httpAdapter.getRequestUrl(ctx.getRequest());

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: pathUrl,
    };

    let request = {
      path: pathUrl,
      method: httpAdapter.getRequestMethod(ctx.getRequest()),
    };
    this.logMessage(
      request,
      { message_content: exception.message, code_error: exception.name },
      httpStatus,
      exception,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private logMessage(
    request: any,
    error: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} 
        status=${status} 
        code_error=${error.code_error ? error.code_error : null} 
        message=${error.message_content ? error.message_content : null}
      `,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} 
        status=${status} 
        code_error=${error.code_error ? error.code_error : null} 
        message=${error.message_content ? error.message_content : null}
      `,
      );
    }
  }
}

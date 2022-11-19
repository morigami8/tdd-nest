import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatbaseConfig } from '../../domain/config/database-config.interface';

@Injectable()
export class EnvironmentConfigService implements DatbaseConfig {
  constructor(private configService: ConfigService) {}

  DATABASE = this.configService.get<string>('DATABASE');
  DATABASE_TYPE = this.configService.get<string>('DATABASE_TYPE');
  DATABASE_HOST = this.configService.get<string>('DATABASE_HOST');
  DATABASE_PORT = this.configService.get<number>('DATABASE_PORT');
  DATABASE_USERNAME = this.configService.get<string>('DATABASE_USERNAME');
  DATABASE_PASSWORD = this.configService.get<string>('DATABASE_PASSWORD');
  DATABASE_SYNCHRONIZE = this.configService.get<boolean>(
    'DATABASE_SYNCHRONIZE',
  );
}

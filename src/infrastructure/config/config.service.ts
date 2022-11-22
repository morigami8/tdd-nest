import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatbaseConfig } from '../../domain/config/database-config.interface';

@Injectable()
export class EnvironmentConfigService implements DatbaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabase(): string {
    return this.configService.get<string>('DATABASE');
  }

  getDatabaseType(): string {
    return this.configService.get<string>('DATABASE_TYPE');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }
}

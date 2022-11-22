export interface DatbaseConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabase(): string;
  getDatabaseSync(): boolean;
}

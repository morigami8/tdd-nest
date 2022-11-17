export interface ILogger {
  warn: (context: string, message: string) => void;
  log: (context: string, message: string) => void;
  debug: (context: string, message: string) => void;
  error: (context: string, message: string) => void;
}

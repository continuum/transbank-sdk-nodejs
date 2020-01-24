export enum LOG_LEVELS {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    CRITICAL = "CRITICAL",
}


export default interface LoggerInterface {
    log(content: any, title?: string | null, level?: keyof typeof LOG_LEVELS): void;
}

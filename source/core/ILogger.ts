interface ILogFunction {
    (message: string, ...args: unknown[]): void;
    (object: unknown, message?: string, ...args: unknown[]): void;
}

interface ILogger {
    info: ILogFunction;
    warn: ILogFunction;
    error: ILogFunction;
    fatal: ILogFunction;
    trace: ILogFunction;
    debug: ILogFunction;
}

export default ILogger;

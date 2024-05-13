/// <reference types="node" />
type ExecutorFunction<T> = (resolve: (value?: T) => void, reject: (error?: unknown) => void) => void;
export declare class Timer {
    intervalTimer: NodeJS.Timeout;
    timeoutTimer: NodeJS.Timeout;
    setInterval(callback: () => void, timeout: number): void;
    clearInterval(): void;
    setTimeout(callback: () => void, timeout: number): void;
    clearTimeout(): void;
}
export declare class TimerPromise<T> extends Promise<T> {
    timer: Timer;
    constructor(executor: ExecutorFunction<T>, timer: Timer);
}
export {};

import { EventEmitter } from 'events';
export declare class SafeEventEmitter extends EventEmitter {
    emit(type: string, ...args: any[]): boolean;
}

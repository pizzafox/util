import {EventEmitter} from 'events';

/**
 * An object where keys are the names of events and values are the type signature of the listener function.
 *
 * @example
 * ```ts
 * interface SafeEvents extends EventListeners {
 *   start: () => void;
 *   finish: (error: Error) => void;
 * }
 * ```
 */
export type EventListeners = Record<Parameters<EventEmitter['on']>[0], Parameters<EventEmitter['on']>[1]>;

interface BuiltInEvents<T extends EventListeners> {
	newListener: <E extends keyof T>(eventName: E, listener: T[E]) => ReturnType<Parameters<EventEmitter['on']>[1]>;
	removeListener: <E extends keyof T>(eventName: E, listener: T[E]) => ReturnType<Parameters<EventEmitter['on']>[1]>;
}

/**
 * Typed event emitter with no built in events.
 */
interface BaseTypedEventEmitter<T extends EventListeners> extends EventEmitter {
	addListener<E extends keyof T>(eventName: E, listener: T[E]): this;
	emit<E extends keyof T>(eventName: E, ...args: Parameters<T[E]>): ReturnType<EventEmitter['emit']>;
	eventNames(): Array<Exclude<keyof T, number>>;
	listenerCount(eventName: keyof T): ReturnType<EventEmitter['listenerCount']>;
	listeners<E extends keyof T>(eventName: E): Array<T[E]>;
	off<E extends keyof T>(eventName: E, listener: T[E]): this;
	on<E extends keyof T>(eventName: E, listener: T[E]): this;
	once<E extends keyof T>(eventName: E, listener: T[E]): this;
	prependListener<E extends keyof T>(eventName: E, listener: T[E]): this;
	prependOnceListener<E extends keyof T>(eventName: E, listener: T[E]): this;
	removeAllListeners(eventName?: keyof T): this;
	removeListener<E extends keyof T>(eventName: E, listener: T[E]): this;
	rawListeners<E extends keyof T>(eventName: E): Array<T[E]>;
}

/**
 * A type-checked `EventEmitter`.
 *
 * @param T - The event names and listener signatures
 *
 * @example
 * ```ts
 * import { EventEmitter } from 'events';
 *
 * type Events = {
 * 	success: () => void;
 * 	error: (error: Error) => void;
 * };
 *
 * class TypedClass extends (EventEmitter as new () => TypedEventEmitter<Events>) {}
 * ```
 */
export interface TypedEventEmitter<T extends EventListeners = {}> extends BaseTypedEventEmitter<T & BuiltInEvents<T>> {}

type WildcardEventEmitterEvents<T extends EventListeners> = {
	'*': <E extends keyof T>(event: E, ...data: Parameters<T[E]>) => void;
};

/**
 * A typed event emitter that emits a `*` event whenever any event is emitted.
 */
export class WildcardEventEmitter<
	T extends WildcardEventEmitterEvents = WildcardEventEmitterEvents<{}>
> extends (EventEmitter as new () => TypedEventEmitter<T>) {
	constructor() {
		super();

		this.on('newListener', event => {
			switch (event) {
				case '*':
				case 'newListener':
				case 'removeListener':
					break;
				default:
					this.on(event, (...data) => {
						this.emit('*', event, ...data);
					});
					break;
			}
		});
	}
}

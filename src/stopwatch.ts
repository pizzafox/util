/**
 * Helper to record the amount of time elapsed between two points during execution.
 *
 * @example
 * ```ts
 * const stopwatch = new Stopwatch();
 *
 * stopwatch.start();
 *
 * stopwatch.end();
 * ```
 * @example
 * ```ts
 * const stopwatch = Stopwatch.start();
 *
 * stopwatch.end();
 * ```
 */
export class Stopwatch {
	private startTime?: bigint;

	/**
	 * If this stopwatch was started at any some point.
	 * This will return `true` even if the stopwatch is stopped.
	 *
	 * @example
	 * ```ts
	 * const stopwatch = new Stopwatch();
	 *
	 * stopwatch.started === false;
	 *
	 * stopwatch.start();
	 *
	 * stopwatch.started === true;
	 *
	 * stopwatch.end();
	 *
	 * stopwatch.started === true;
	 * ```
	 */
	get started(): boolean {
		return this.startTime !== undefined;
	}

	/**
	 * Create a new stopwatch and start timing it.
	 *
	 * @example
	 * ```ts
	 * const stopwatch = Stopwatch.start();
	 * ```
	 */
	static start(): Stopwatch {
		const stopwatch = new this();

		stopwatch.start();

		return stopwatch;
	}

	/**
	 * Start recording the duration of this stopwatch.
	 * @example
	 * ```ts
	 * const stopwatch = new Stopwatch();
	 *
	 * stopwatch.start();
	 * ```
	 */
	start(): void {
		this.startTime = process.hrtime.bigint();
	}

	/**
	 * Return the duration elapsed since the start.
	 *
	 * @example
	 * ```ts
	 * stopwatch.end();
	 * ```
	 *
	 * @returns The amount of time elapsed in milliseconds.
	 */
	end(): number {
		if (__DEV__ && this.startTime === undefined) {
			throw new Error('This timer was not started');
		}

		return Number(process.hrtime.bigint() - this.startTime!) / 1_000_000;
	}
}

/**
 * Samples a single element at random from an array.
 * @param array - Array to sample element from
 * @returns A random element from the array
 */
// @ts-expect-error
export function sample<T>(array: T[]): T;
export function sample(array: readonly []): undefined;
export function sample<T>(array: [T]): T {
	return array[Math.floor(Math.random() * array.length)];
}

/** @returns `T` if `T` is not a union type, `never` otherwise. */
type NonUnion<T, U extends T = T> = (T extends T ? (U extends T ? false : true) : never) extends false ? T : never;

/**
 * Create a copy of an object with a key renamed.
 *
 * @example
 * ```ts
 * const object = { a: 1 };
 *
 * rename(object, 'a', 'b'); // { b: 1 }
 * ```
 *
 * @param object - The object you are renaming a key of
 * @param oldKey - The key to rename
 * @param newKey - The new name for the key
 *
 * @returns A shallow-copied object with the key name updated
 */
export function rename<T, K1 extends keyof T, K2 extends PropertyKey>(
	target: T,
	oldKey: NonUnion<K1>,
	newKey: NonUnion<K2>
): Omit<T, K1 | K2> & Record<K2, T[K1]>;
export function rename<T, K1 extends keyof T, K2 extends PropertyKey>(object: T, oldKey: K1, newKey: K1 | K2): Omit<T, K1 | K2> & Record<string, T[K1]> {
	if (oldKey === newKey) {
		return {...object} as any;
	}

	const {[oldKey]: _, ...result} = {...object, [newKey]: object[oldKey]};

	// This logic can be rewritten to remove the need for a type assertion, but would require 2 iterations over result instead of 1
	return result as any;
}

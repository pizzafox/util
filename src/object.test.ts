import {rename} from './object';

describe(rename.name, () => {
	it('renames', () => {
		expect(rename({a: 1, c: 2}, 'a', 'b')).toStrictEqual({b: 1, c: 2});

		expect(rename({a: 1, c: 2}, 'a', 'a')).toStrictEqual({a: 1, c: 2});

		// @ts-expect-error
		expect(rename({a: 1, c: 2}, 'b', 'a')).toStrictEqual({a: undefined, c: 2});

		const key = Math.random() < 0.5 ? 'a' : 'b';

		rename(
			{a: 1, c: 2},
			'a',
			// @ts-expect-error
			key,
		);

		rename(
			{a: 1, b: 2},
			// @ts-expect-error
			key,
			'c',
		);
	});
});

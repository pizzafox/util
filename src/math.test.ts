import {median, mode, stddev, variance} from '.';

describe('variance', () => {
	it('calculates variance', () => {
		expect(variance([1, 1, 1])).toBe(0);
		expect(variance([1, 2, 3])).toBe(1);
		expect(variance([1, 3, 5])).toBe(4);
	});
});

describe('stddev', () => {
	it('calculates standard deviation', () => {
		expect(stddev([1, 1, 1])).toBe(0);
		expect(stddev([1, 2, 3])).toBe(1);
		expect(stddev([1, 3, 5])).toBe(2);
	});
});

describe('median', () => {
	it('calculates the median', () => {
		expect(median([1])).toBe(1);
		expect(median([1, 2, 3])).toBe(2);
		expect(median([2, 3])).toBe(2.5);
		expect(median([1, 2, 3, 4, 5, 6, 8, 9])).toBe(4.5);
	});
});

describe('mode', () => {
	it('calculates the mode', () => {
		expect(mode([])).toStrictEqual([]);
		expect(mode([1])).toStrictEqual([1]);
		expect(mode([1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 17])).toStrictEqual([6]);
		expect(mode([1, 2, 2, 3, 4, 7, 9])).toStrictEqual([2]);
		expect(mode([1, 1, 2, 4, 4])).toStrictEqual([1, 4]);
	});
});

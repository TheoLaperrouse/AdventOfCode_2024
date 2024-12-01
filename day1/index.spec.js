import solve from './index';

describe('Day1', () => {
    test('Easy input', () => {
        const input = ` 3   4
                        4   3
                        2   5
                        1   3
                        3   9
                        3   3`;
        const result = solve(input);
        expect(result.part1).toBe(11);
        expect(result.part2).toBe(31);
    });
});

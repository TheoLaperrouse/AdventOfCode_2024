import solve from './index';

describe('Day2', () => {
    test('Easy input', () => {
        const input = ` 7 6 4 2 1
                        1 2 7 8 9
                        9 7 6 2 1
                        1 3 2 4 5
                        8 6 4 4 1
                        1 3 6 7 9`;
        const result = solve(input);
        expect(result.part1).toBe(2);
        expect(result.part2).toBe(4);
    });
});

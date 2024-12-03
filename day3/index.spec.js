import solve from './index';

describe('Day3', () => {
    test('Easy input 1', () => {
        const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
        const result = solve(input);
        expect(result.part1).toBe(161);
    });

    test('Easy input 2', () => {
        const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
        const result = solve(input);
        expect(result.part2).toBe(48);
    });
});

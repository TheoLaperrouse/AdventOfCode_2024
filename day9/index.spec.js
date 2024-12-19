import solve from './index';

describe('Day9', () => {
    test('Easy input 1', () => {
        const input = '2333133121414131402';
        const result = solve(input);
        expect(result.part1).toBe(1928);
        expect(result.part2).toBe(2858);
    });
});

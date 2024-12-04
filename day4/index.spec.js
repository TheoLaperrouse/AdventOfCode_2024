import solve from './index';

describe('Day4', () => {
    test('Easy input 1', () => {
        const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
        const result = solve(input);
        expect(result.part1).toBe(18);
        expect(result.part2).toBe(9);
    });
});

import solve from './index';

describe('Day8', () => {
    test('Easy input 1', () => {
        const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
        const result = solve(input);
        expect(result.part1).toBe(14);
        expect(result.part2).toBe(34);
    });
});
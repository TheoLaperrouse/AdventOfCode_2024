import solve from './index';

describe('Day5', () => {
    test('Easy input 1', () => {
        const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
        const result = solve(input);
        expect(result.part1).toBe(143);
        expect(result.part2).toBe(123);
    });
});

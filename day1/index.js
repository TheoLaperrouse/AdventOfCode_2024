import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readInput(fileName) {
    const filePath = path.resolve(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf-8').trim();
}

function parseInput(rawInput) {
    const list1 = [];
    const list2 = [];
    rawInput.split('\n').map((line) => {
        const [loc1, loc2] = line.trim().split(/\s+/).map(Number);
        list1.push(loc1);
        list2.push(loc2);
    });

    return [list1, list2];
}

function solvePart1(input) {
    const [list1, list2] = input;
    list1.sort();
    list2.sort();
    const res = list1.reduce((sum, value, index) => {
        return sum + Math.abs(list2[index] - value);
    }, 0);
    return res;
}

function solvePart2(input) {
    const [list1, list2] = input;
    const countMap = {};
    const res = list1.reduce((sum, value) => {
        if (!countMap[value]) {
            countMap[value] = list2.filter((search) => value === search).length;
        }
        return sum + countMap[value] * value;
    }, 0);
    return res;
}

export default function solve(rawInput) {
    if (!rawInput) {
        rawInput = readInput('input.txt');
    }

    const parsedInput = parseInput(rawInput);

    const part1 = solvePart1(parsedInput);
    const part2 = solvePart2(parsedInput);

    console.log('Partie 1 :', part1);
    console.log('Partie 2 :', part2);

    return { part1, part2 };
}

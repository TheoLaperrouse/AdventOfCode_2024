import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readInput(fileName) {
    const filePath = path.resolve(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf-8').trim();
}

function parseInput1(rawInput) {
    return [...rawInput.matchAll(/mul\((\d+,\d+)\)/gm)].map((match) => {
        const terms = match[1].split(',');
        return [Number(terms[0]), Number(terms[1])];
    });
}

function parseInput2(rawInput) {
    let enabled = true;
    return [...rawInput.matchAll(/mul\((\d+,\d+)\)|don't\(\)|do\(\)/gm)].map((match) => {
        if (match[0] === 'do()') {
            enabled = true;
        } else if (match[0] === "don't()") {
            enabled = false;
        } else if (enabled) {
            const terms = match[1].split(',');
            return [Number(terms[0]), Number(terms[1])];
        }
        return [0, 0];
    });
}

function solvePart1(input) {
    return input.reduce((sum, value) => sum + value[0] * value[1], 0);
}

function solvePart2(input) {
    return input.reduce((sum, value) => sum + value[0] * value[1], 0);
}

export default function solve(rawInput) {
    if (!rawInput) {
        rawInput = readInput('input.txt');
    }

    const parsedInput1 = parseInput1(rawInput);
    const parsedInput2 = parseInput2(rawInput);

    const part1 = solvePart1(parsedInput1);
    const part2 = solvePart2(parsedInput2);

    console.log('Partie 1 :', part1);
    console.log('Partie 2 :', part2);

    return { part1, part2 };
}

import fs from 'fs';
import path from 'path';
import { isEqual } from 'lodash';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isSafePart1 = (array) => {
    for (let i = 0; i < array.length + 1; i++) {
        if (array[i + 1]) {
            const diff = Math.abs(array[i] - array[i + 1]);
            if (diff > 3 || diff < 1) {
                return false;
            }
        }
    }
    const ascSortedArray = [...array];
    const descSortedArray = [...array];
    ascSortedArray.sort((a, b) => a - b);
    descSortedArray.sort((a, b) => b - a);
    return isEqual(ascSortedArray, array) || isEqual(descSortedArray, array);
};

const isSafePart2 = (array) => {
    if (isSafePart1(array)) {
        return true;
    }
    for (let i = 0; i < array.length; i++) {
        const updatedArray = array.slice(0, i).concat(array.slice(i + 1));
        if (isSafePart1(updatedArray)) {
            return true;
        }
    }
    return false;
};

function readInput(fileName) {
    const filePath = path.resolve(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf-8').trim();
}

function parseInput(rawInput) {
    return rawInput.split('\n').map((line) => line.trim().split(/\s+/).map(Number));
}

function solvePart1(input) {
    let count = 0;
    for (const report of input) {
        if (isSafePart1(report)) {
            count++;
        }
    }
    return count;
}

function solvePart2(input) {
    let count = 0;
    for (const report of input) {
        if (isSafePart2(report)) {
            count++;
        }
    }
    return count;
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

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
    return rawInput.split('\n');
}

function solvePart1(input) {
    const words = [];
    let res = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (j + 3 < input[i].length) {
                words.push([input[i][j], input[i][j + 1], input[i][j + 2], input[i][j + 3]]);
            }
            if (i + 3 < input.length) {
                words.push([input[i][j], input[i + 1][j], input[i + 2][j], input[i + 3][j]]);

                if (j + 3 < input[i].length) {
                    words.push([input[i][j], input[i + 1][j + 1], input[i + 2][j + 2], input[i + 3][j + 3]]);
                }

                if (j - 3 >= 0) {
                    words.push([input[i][j], input[i + 1][j - 1], input[i + 2][j - 2], input[i + 3][j - 3]]);
                }
            }
        }
    }
    res = words.filter((word) => ['XMAS', 'SAMX'].includes(word.join(''))).length;

    return res;
}

function solvePart2(input) {
    let res = 0;

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === 'A') {
                if (input[i - 1] && input[i + 1]) {
                    const top = input[i - 1][j - 1] + input[i - 1][j + 1];
                    const bot = input[i + 1][j - 1] + input[i + 1][j + 1];

                    if (
                        (top === 'MS' && bot === 'MS') ||
                        (top === 'SM' && bot === 'SM') ||
                        (top === 'SS' && bot === 'MM') ||
                        (top === 'MM' && bot === 'SS')
                    ) {
                        res++;
                    }
                }
            }
        }
    }

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

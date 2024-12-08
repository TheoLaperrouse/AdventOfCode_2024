import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readInput(fileName) {
    const filePath = path.resolve(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf-8').trim();
}

function evalLeftToRight(equation) {
    const terms = equation.split(/\s+/);

    return terms.reduce(
        (acc, curr, index) => {
            if (index === 0) {
                acc.result = Number(curr);
            } else if (index % 2 !== 0) {
                acc.operator = curr;
            } else {
                const num = Number(curr);
                if (acc.operator === '+') {
                    acc.result += num;
                } else if (acc.operator === '*') {
                    acc.result *= num;
                } else if (acc.operator === '||') {
                    acc.result = Number(`${acc.result}${num}`);
                }
            }
            return acc;
        },
        { result: 0, operator: null },
    ).result;
}

const generateCombinations = (terms, part) => {
    if (terms.length === 1) {
        return [terms[0]];
    }

    const combinations = generateCombinations(terms.slice(1), part);

    const newCombinations = [];
    const operators = part === 1 ? ['+', '*'] : ['+', '*', '||'];
    for (const combination of combinations) {
        operators.forEach((operator) => newCombinations.push(terms[0] + ' ' + operator + ' ' + combination));
    }

    return newCombinations;
};

function getCalibrationResult([result, terms], part) {
    let res = 0;
    const combinations = generateCombinations(terms, part);
    for (const equation of combinations) {
        if (evalLeftToRight(equation) === result) {
            res += result;
            break;
        }
    }

    return res;
}

function parseInput(rawInput) {
    const equations = rawInput.split('\n').map((equation) => {
        const [resultInput, termsInput] = equation.split(':');
        return [Number(resultInput), termsInput.trim().split(/\s+/).map(Number)];
    });
    return equations;
}

function solvePart1(input) {
    let calibrationTotal = 0;
    for (const equation of input) {
        calibrationTotal += getCalibrationResult(equation, 1);
    }
    return calibrationTotal;
}

function solvePart2(input) {
    let calibrationTotal = 0;
    for (const equation of input) {
        calibrationTotal += getCalibrationResult(equation, 2);
    }
    return calibrationTotal;
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

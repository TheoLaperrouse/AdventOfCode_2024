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
    const diskBlock = [];
    let count = 0;
    rawInput.split('').forEach((number, index) => {
        if (index % 2 === 0) {
            addElementNTimes(diskBlock, count, number);
            count += 1;
        } else {
            addElementNTimes(diskBlock, '.', number);
        }
    });
    return diskBlock;
}

function addElementNTimes(array, element, n) {
    array = array.push(...Array.from({ length: n }, () => element));
    return array;
}

function solvePart1(input) {
    const diskBlock = input;
    for (let currentIndex = diskBlock.length - 1; currentIndex > 0; currentIndex--) {
        if (diskBlock[currentIndex] === '.') {
            continue;
        }

        const freeSlotIndex = diskBlock.findIndex((value) => value === '.');

        if (freeSlotIndex > -1 && freeSlotIndex < currentIndex) {
            diskBlock[freeSlotIndex] = diskBlock[currentIndex];
            diskBlock[currentIndex] = '.';
        }
    }
    const optimizedDisk = diskBlock.filter((char) => char !== '.');
    const res = optimizedDisk.reduce((sum, value, index) => (sum += value * index), 0);

    return res;
}

function solvePart2(input) {
    const diskBlock = [...input];
    const files = [];
    let currentIndex = 0;
    let currentId = 0;

    for (let i = 0; i < diskBlock.length; i++) {
        const id = i % 2 === 0 ? currentId : null;
        files.push({ id, index: currentIndex, size: diskBlock[i] });
        currentIndex += diskBlock[i];

        if (i % 2 === 0) {
            currentId++;
        }
    }

    for (let i = files.length - 1; i > 0; i--) {
        const file = files[i];

        if (file.id !== null) {
            for (let j = 0; j < i; j++) {
                const targetfile = files[j];

                if (targetfile.id === null && targetfile.size >= file.size) {
                    files.splice(i, 1);
                    file.index = targetfile.index;
                    files.splice(j, 0, file);

                    targetfile.size -= file.size;
                    targetfile.index += file.size;
                    break;
                }
            }
        }
    }

    let result = 0;
    for (const file of files) {
        if (file.id !== null) {
            for (let offset = 0; offset < file.size; offset++) {
                result += (file.index + offset) * file.id;
            }
        }
    }

    return result;
}

export default function solve(rawInput) {
    if (!rawInput) {
        rawInput = readInput('input.txt');
    }

    const parsedInput = parseInput(rawInput);

    const part1 = solvePart1(parsedInput);
    const part2 = solvePart2(rawInput.split('').map(Number));

    console.log('Partie 1 :', part1);
    console.log('Partie 2 :', part2);

    return { part1, part2 };
}

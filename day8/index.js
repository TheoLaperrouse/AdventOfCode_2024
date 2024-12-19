import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isInBounds = ([line, column], width, height) => line >= 0 && column < height && column >= 0 && line < width;

function getAntinodes(antenna1, antenna2, width, height) {
    const [antenna1Line, antenna1Column] = antenna1;
    const [antenna2Line, antenna2Column] = antenna2;

    const lineDir = antenna2Line - antenna1Line;
    const columnDir = antenna2Column - antenna1Column;

    const antinode1 = [antenna1Line - lineDir, antenna1Column - columnDir];
    const antinode2 = [antenna2Line + lineDir, antenna2Column + columnDir];

    const result = [];
    if (isInBounds(antinode1, width, height)) {
        result.push(antinode1);
    }
    if (isInBounds(antinode2, width, height)) {
        result.push(antinode2);
    }

    return result;
}

function getAntinodes2(antenna1, antenna2, width, height) {
    const [antenna1Line, antenna1Column] = antenna1;
    const [antenna2Line, antenna2Column] = antenna2;

    const antinodes1 = [];
    const antinodes2 = [];

    const lineDir = antenna2Line - antenna1Line;
    const columnDir = antenna2Column - antenna1Column;

    let antinode = [antenna1Line - lineDir, antenna1Column - columnDir];
    while (isInBounds(antinode, width, height)) {
        antinodes1.push([...antinode]);
        antinode = [antinode[0] - lineDir, antinode[1] - columnDir];
    }

    antinode = [antenna2Line + lineDir, antenna2Column + columnDir];
    while (isInBounds(antinode, width, height)) {
        antinodes2.push([...antinode]);
        antinode = [antinode[0] + lineDir, antinode[1] + columnDir];
    }

    return [...antinodes1, ...antinodes2];
}

function readInput(fileName) {
    const filePath = path.resolve(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf-8').trim();
}

function parseInput(rawInput) {
    const antennas = {};
    const rows = rawInput.trim().split('\n');

    rows.forEach((line, y) => {
        for (let x = 0; x < line.length; x++) {
            const frequency = line[x];
            if (frequency !== '.') {
                if (!antennas[frequency]) {
                    antennas[frequency] = [];
                }
                antennas[frequency].push([x, y]);
            }
        }
    });

    return { rows, antennas, width: rows[0].length, height: rows.length };
}

function solvePart1(input) {
    const { antennas, width, height } = input;
    const uniqueAntinodes = new Set();

    for (const frequency in antennas) {
        const posAntenna = antennas[frequency];

        for (let i = 0; i < posAntenna.length; i++) {
            for (let j = i + 1; j < posAntenna.length; j++) {
                const antenna1 = posAntenna[i];
                const antenna2 = posAntenna[j];

                const antinodes = getAntinodes(antenna1, antenna2, width, height);
                for (const antinode of antinodes) {
                    uniqueAntinodes.add(antinode.toString());
                }
            }
        }
    }

    return uniqueAntinodes.size;
}

function solvePart2(input) {
    const { antennas, width, height } = input;
    const uniqueAntinodes = new Set();

    for (const frequency in antennas) {
        const posAntenna = antennas[frequency];

        for (let i = 0; i < posAntenna.length; i++) {
            uniqueAntinodes.add(posAntenna[i].toString());
            for (let j = i + 1; j < posAntenna.length; j++) {
                const antenna1 = posAntenna[i];
                const antenna2 = posAntenna[j];

                const antinodes = getAntinodes2(antenna1, antenna2, width, height);
                for (const antinode of antinodes) {
                    uniqueAntinodes.add(antinode.toString());
                }
            }
        }
    }
    return uniqueAntinodes.size;
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

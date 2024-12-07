import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const turnRight = { left: 'top', top: 'right', right: 'bottom', bottom: 'left' };

// function printGrid(grid, positions) {
//     const mutableGrid = grid.map((row) => [...row]);
//     positions.forEach((pos) => {
//         const [row, col] = pos;
//         mutableGrid[row][col] = 'X';
//     });
//     mutableGrid.forEach((line) => console.log(line.join('')));
// }

function move(direction, pos) {
    switch (direction) {
        case 'left':
            return [pos[0], pos[1] - 1];
        case 'right':
            return [pos[0], pos[1] + 1];
        case 'top':
            return [pos[0] - 1, pos[1]];
        case 'bottom':
            return [pos[0] + 1, pos[1]];
    }
}

function readInput(fileName) {
    const filePath = path.resolve(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf-8').trim();
}

function parseInput(rawInput) {
    const map = rawInput.split('\n');
    let guardPos;
    map.map((line, index) => {
        if (line.includes('^')) {
            guardPos = [index, line.indexOf('^')];
        }
    });
    return [guardPos, map];
}

function solvePart1(input) {
    let guardPos = input[0];
    const map = input[1];
    const posSet = new Set();

    let direction = 'top';
    let lastPos;
    let isMoving = true;

    while (isMoving) {
        const newPos = map[guardPos[0]]?.[guardPos[1]];

        if (['.', '^'].includes(newPos)) {
            lastPos = guardPos;
            guardPos = move(direction, guardPos);
        } else if (newPos === '#') {
            let rotated = false;
            while (!rotated) {
                direction = turnRight[direction];
                const nextPos = move(direction, lastPos);
                const nextPosValue = map[nextPos[0]]?.[nextPos[1]];

                if (nextPosValue !== '#') {
                    guardPos = nextPos;
                    rotated = true;
                }
            }
        } else {
            isMoving = false;
        }

        if (lastPos) {
            const serializedPos = `${lastPos[0]},${lastPos[1]}`;
            posSet.add(serializedPos);
        }
    }
    return posSet.size;
}

function solvePart2(input) {
    const originalMap = input[1];

    let paradoxCount = 0;

    const rows = originalMap.length;
    const cols = originalMap[0].length;
    const grids = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (originalMap[row][col] === '.') {
                const newGrid = originalMap.map((row) => [...row]);
                newGrid[row][col] = '#';
                grids.push(newGrid);
            }
        }
    }

    for (const grid of grids) {
        let guardPos = input[0];
        let direction = 'top';
        let isMoving = true;
        let lastPos;
        let countLoop = 0;
        while (isMoving) {
            const newPos = grid[guardPos[0]]?.[guardPos[1]];
            if (['.', '^'].includes(newPos)) {
                lastPos = guardPos;
                guardPos = move(direction, guardPos);
            } else if (newPos === '#') {
                let rotated = false;
                while (!rotated) {
                    direction = turnRight[direction];
                    const nextPos = move(direction, lastPos);
                    const nextPosValue = grid[nextPos[0]]?.[nextPos[1]];

                    if (nextPosValue !== '#') {
                        guardPos = nextPos;
                        rotated = true;
                    }
                }
            } else {
                isMoving = false;
            }
            countLoop++;
            if (countLoop === 10000) {
                paradoxCount += 1;
                isMoving = false;
            }
        }
    }
    return paradoxCount;
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

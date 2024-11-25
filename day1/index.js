import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readInput(fileName) {
    try {
        const filePath = path.resolve(__dirname, fileName);
        return fs.readFileSync(filePath, 'utf-8').trim();
    } catch (error) {
        console.error(`Erreur lors de la lecture du fichier ${fileName} :`, error.message);
        process.exit(1);
    }
}

function parseInput(rawInput) {
    return rawInput.split('\n').map((line) => line.trim());
}

function solvePart1(input) {
    return 'Résultat Partie 1';
}

function solvePart2(input) {
    return 'Résultat Partie 2';
}

function solve() {
    const rawInput = readInput('input.txt');
    const parsedInput = parseInput(rawInput);
    const part1 = solvePart1(parsedInput);
    console.log('Partie 1 :', part1);

    const part2 = solvePart2(parsedInput);
    console.log('Partie 2 :', part2);

    return { part1, part2 };
}

export default solve;

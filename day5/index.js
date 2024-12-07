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
    const [pageRulesInput, pagesToProduceInput] = rawInput.split('\n\n');
    const pageRules = pageRulesInput.split('\n').map((pageRule) => pageRule.split('|'));
    const pagesToProduce = pagesToProduceInput.split('\n').map((pageRule) => pageRule.split(','));
    return [pageRules, pagesToProduce];
}

function solvePart1(input) {
    const [pageRules, pagesToProduce] = input;
    const validPages = pagesToProduce.filter((pageToProduce) => {
        for (const [ruleStart, ruleEnd] of pageRules) {
            const page1 = pageToProduce.indexOf(ruleStart);
            const page2 = pageToProduce.indexOf(ruleEnd);

            if (page1 !== -1 && page2 !== -1 && page1 > page2) {
                return false;
            }
        }
        return true;
    });

    return validPages.reduce((sum, validPage) => sum + Number(validPage[Math.floor(validPage.length / 2)]), 0);
}
function solvePart2(input) {
    const [pageRules, pagesToProduce] = input;
    const maxIterations = Math.ceil(Math.max(...pagesToProduce.map((page) => page.length)) / 2);

    let invalidPages = pagesToProduce.filter((pageToProduce) => {
        for (const [ruleStart, ruleEnd] of pageRules) {
            const page1 = pageToProduce.indexOf(ruleStart);
            const page2 = pageToProduce.indexOf(ruleEnd);

            if (page1 !== -1 && page2 !== -1 && page1 > page2) {
                return true;
            }
        }
        return false;
    });

    for (let i = 0; i < maxIterations; i++) {
        invalidPages = invalidPages.map((page) => {
            for (const [ruleStart, ruleEnd] of pageRules) {
                const page1 = page.indexOf(ruleStart);
                const page2 = page.indexOf(ruleEnd);

                if (page1 !== -1 && page2 !== -1 && page1 > page2) {
                    [page[page1], page[page2]] = [page[page2], page[page1]];
                }
            }
            return page;
        });
    }

    return invalidPages.reduce((sum, page) => sum + Number(page[Math.floor(page.length / 2)]), 0);
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

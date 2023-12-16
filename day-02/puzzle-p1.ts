import fs from 'fs';

interface Round {
    red: number;
    green: number;
    blue: number;
}

interface Game {
    id: number;
    rounds: Round[];
}

function parseInput(file: string): Game[] {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    return lines.flatMap(line => {
        const [idPart, roundsPart] = line.split(': ');
        const id = parseInt(idPart.replace('Game ', ''));

        const rounds = roundsPart.split('; ').map(roundPart => {
            const colors = roundPart.split(', ');
            const round: Round = { red: 0, green: 0, blue: 0 };

            for (const color of colors) {
                const [count, colorName] = color.split(' ');
                round[colorName as keyof Round] = parseInt(count);
            }

            return round;
        });

        return [{ id, rounds }];
    });
}

function isGamePossible(game: Game, red: number, green: number, blue: number): boolean {
    for (const round of game.rounds) {
        if (round.red > red || round.green > green || round.blue > blue) {
            return false;
        }
    }

    return true;
}

function sumPossibleGameIds(games: Game[], red: number, green: number, blue: number): number {
    let sum = 0;

    for (const game of games) {
        if (isGamePossible(game, red, green, blue)) {
            sum += game.id;
        }
    }

    return sum;
}

const games = parseInput('input.txt');
console.log(sumPossibleGameIds(games, 12, 13, 14));

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

function minCubesForGame(game: Game): Round {
    let minCubes: Round = { red: 0, green: 0, blue: 0 };

    for (const round of game.rounds) {
        minCubes.red = Math.max(minCubes.red, round.red);
        minCubes.green = Math.max(minCubes.green, round.green);
        minCubes.blue = Math.max(minCubes.blue, round.blue);
    }

    return minCubes;
}

function powerOfCubes(cubes: Round): number {
    return cubes.red * cubes.green * cubes.blue;
}

function sumPowersOfMinCubes(games: Game[]): number {
    let sum = 0;

    for (const game of games) {
        const minCubes = minCubesForGame(game);
        sum += powerOfCubes(minCubes);
    }

    return sum;
}

const games = parseInput('input.txt');
console.log(sumPowersOfMinCubes(games));

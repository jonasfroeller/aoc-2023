const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const SCRIPT_OPTIONS = ["puzzle-p1", "puzzle-p2"];

function startScript(scriptName: string) {
    exec(`bun run ${scriptName}.ts`, (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`Error executing ${scriptName}.ts: ${error}`);
        }

        console.log(stdout);
        console.error(stderr);
        rl.close();
    });
}

rl.question('Choose between part 1 and 2: ', (answer: string) => {
    if (answer === '1') {
        startScript(SCRIPT_OPTIONS[0]);
    } else if (answer === '2') {
        startScript(SCRIPT_OPTIONS[1]);
    } else {
        console.log('Invalid Input.');
        rl.close();
    }
});

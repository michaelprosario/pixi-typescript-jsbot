import { GridBot } from './grid-bot';

export class GridBotCommander {
    commands: Array<string> = [];

    moveRight(angle: number) {
        this.commands.push(`moveRight|${angle}`);
    }

    moveLeft(angle: number) {
        this.commands.push(`moveLeft|${angle}`);
    }

    moveForward(delta: number) {
        this.commands.push(`moveForward|${delta}`);
    }

    execute(gridBot: GridBot, delayTime: number) {

        let i = 0;

        this.executeCommand(i, gridBot, delayTime);

    }

    private executeCommand(i: number, gridBot: GridBot, delayTime: number) {
        let command = this.commands[i];
        this.doCommand(command, gridBot);
        i++;
        if (i < this.commands.length) {
            setTimeout(() => {
                this.executeCommand(i, gridBot, delayTime);
            }, delayTime);
        }
    }

    private doCommand(command: string, gridBot: GridBot) {
        if (command.startsWith("moveForward")) {
            let strArgument = command.split("|")[1];
            let intArgument = parseInt(strArgument);
            gridBot.moveForward(intArgument);
        }
        else if (command.startsWith("moveLeft")) {
            let strArgument = command.split("|")[1];
            let intArgument = parseInt(strArgument);
            gridBot.moveLeft(intArgument);
        }
        else if (command.startsWith("moveRight")) {
            let strArgument = command.split("|")[1];
            let intArgument = parseInt(strArgument);
            gridBot.moveRight(intArgument);
        }
        else {
            throw new Error("Invalid command: " + command);
        }
    }
}
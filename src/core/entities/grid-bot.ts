import { BotDirection } from "../enums/bot-direction";
import { ISprite, ISpriteBehavior } from "../interfaces/interfaces";

export class GridBotSetup {
    constructor(
        public x: number,
        public y: number,
        public gridCellWidth: number
    ) { }
}

export class GridBot implements ISprite {
    currentBehavior: ISpriteBehavior | undefined;
    direction: BotDirection = BotDirection.East;
    gridCellWidth: number = 25;
    gridX: number = 0;
    gridY: number = 0;
    idleBehavior: ISpriteBehavior | undefined;
    moveBehavior: ISpriteBehavior | undefined;
    x: number = 0;
    y: number = 0;

    moveRight() {
        this.direction++;
        if (this.direction > 3) {
            this.direction = 0;
        }
    }

    moveLeft() {
        this.direction--;
        if (this.direction < 0) {
            this.direction = 3;
        }
    }

    start(): void {
    }

    update(): void {
        this.currentBehavior?.update(this);
    }

    finish(): void { }

    setupBot(setup: GridBotSetup): void {
        this.gridCellWidth = setup.gridCellWidth;
        this.gridX = setup.x;
        this.gridY = setup.y;
        this.x = this.gridCellWidth * this.gridX;
        this.y = this.gridCellWidth * this.gridY;
    }

    moveForward() {
        this.currentBehavior = this.moveBehavior;
    }
}
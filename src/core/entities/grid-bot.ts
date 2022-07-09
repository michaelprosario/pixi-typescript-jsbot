
export enum BotDirection {
    North = 0,
    East = 1,
    South = 2,
    West = 3
}

export class GridBotSetup {
    constructor(
        public x: number,
        public y: number,
        public gridCellWidth: number
    ) { }
}

export interface ISprite {
    currentBehavior: ISpriteBehavior | undefined;
    start(): void;
    update(): void;
    finish(): void;
}

export interface ISpriteBehavior {
    start(sprite: ISprite): void;
    update(sprite: ISprite): void;
    finish(sprite: ISprite): void;
}

export class GridBot implements ISprite {
    start(): void {
    }

    update(): void {
        this.currentBehavior?.update(this);
    }

    finish(): void { }

    currentBehavior: ISpriteBehavior | undefined;
    direction: BotDirection = BotDirection.East;
    gridX: number = 0;
    gridY: number = 0;
    gridCellWidth: number = 25;
    x: number = 0;
    y: number = 0;
    moveBehavior: ISpriteBehavior | undefined;
    idleBehavior: ISpriteBehavior | undefined;

    setupBot(setup: GridBotSetup): void {
        this.gridX = setup.x;
        this.gridY = setup.y;
        this.gridCellWidth = setup.gridCellWidth;
        this.x = this.gridCellWidth * this.gridX;
        this.y = this.gridCellWidth * this.gridY;
    }

    moveForward() {
        console.log("move forward");
        // put bot into state to move 
        this.currentBehavior = this.moveBehavior;
    }
}
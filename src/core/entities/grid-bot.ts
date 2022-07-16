import { GameConstants } from "../../presentation/game-constants";
import { ISprite, ISpriteBehavior, IViewableSprite } from "../interfaces/interfaces";

export class GridBotSetup {
    constructor(
        public x: number,
        public y: number,
        public gridCellWidth: number
    ) { }
}

export class GridBot implements ISprite {
    currentBehavior: ISpriteBehavior | undefined;
    forwardDelta: number = GameConstants.gridWidth;
    gridCellWidth: number = GameConstants.gridWidth;
    gridView: IViewableSprite | undefined;
    gridX: number = 0;
    gridY: number = 0;
    heading: number = 0;
    idleBehavior: ISpriteBehavior | undefined;
    moveBehavior: ISpriteBehavior | undefined;
    turnBehavior: ISpriteBehavior | undefined;

    x: number = 0;
    y: number = 0;
    isMovingLeft: boolean = false;
    turnAngle: number = 0;

    moveForward(delta: number) {
        this.currentBehavior = this.moveBehavior;
        this.forwardDelta = delta;
    }

    moveRight(angle: number) {
        this.isMovingLeft = false;
        this.turnAngle = angle;
        this.currentBehavior = this.turnBehavior;
    }

    moveLeft(angle: number) {
        this.isMovingLeft = true;
        this.turnAngle = angle;
        this.currentBehavior = this.turnBehavior;
    }

    start(): void {
        this.gridView?.start();
    }

    update(): void {
        this.currentBehavior?.update(this);
        this.gridView?.update();
    }

    finish(): void { }

    setupBot(setup: GridBotSetup): void {
        this.gridCellWidth = setup.gridCellWidth;
        this.gridX = setup.x;
        this.gridY = setup.y;
        this.x = this.gridCellWidth * this.gridX;
        this.y = this.gridCellWidth * this.gridY;
    }
}
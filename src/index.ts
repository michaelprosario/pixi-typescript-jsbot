import { Application, Loader, Graphics } from "pixi.js";
import "./style.css";
import { GameConstants } from "./presentation/game-constants"
import { MathService } from "./core/services/math-service"
import { GameGrid } from "./core/entities/game-grid";
import { GameGridCell, GameGridCellContent } from "./core/entities/game-grid-cell";
import { GridBot, GridBotSetup } from "./core/entities/grid-bot";
import { GridBotIdleBehavior } from "./presentation/grid-bot/grid-bot-idle-behavior";
import { GridBotMoveBehavior } from "./presentation/grid-bot/grid-bot-move-behavior";
import { GridBotView } from "./presentation/grid-bot/grid-bot-view";

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

function createTestGrid(gameGrid: GameGrid) {
    for (let i = 0; i < 18; i++) {
        gameGrid.setGridCell(5, i, GameGridCellContent.Wall);
        gameGrid.setGridCell(15, i, GameGridCellContent.Wall);
        gameGrid.setGridCell(25, i, GameGridCellContent.Wall);
    }

    for (let i = 19; i > 2; i--) {
        gameGrid.setGridCell(8, i, GameGridCellContent.Wall);
        gameGrid.setGridCell(18, i, GameGridCellContent.Wall);
        gameGrid.setGridCell(28, i, GameGridCellContent.Wall);
    }
}


function createTestGrid2(gameGrid: GameGrid) {
    for (let i = 0; i < 200; i++) {
        let x = MathService.getRandomInt(0, 29);
        let y = MathService.getRandomInt(0, 19);
        gameGrid.setGridCell(x, y, GameGridCellContent.Wall);
    }

    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            gameGrid.setGridCell(x, y, GameGridCellContent.Empty);
        }
    }

    for (let x = 25; x < 30; x++) {
        for (let y = 15; y < 20; y++) {
            gameGrid.setGridCell(x, y, GameGridCellContent.Empty);
        }
    }
}

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});


window.onload = async (): Promise<void> => {

    let colorScheme = [0x161032, 0xfaff81, 0xffc53a, 0xe06d06, 0xb26700];

    document.body.appendChild(app.view);

    const graphics = new Graphics();

    let gridBot = new GridBot();

    gridBot.setupBot(new GridBotSetup(0, 0, GameConstants.gridHeight));
    gridBot.currentBehavior = new GridBotIdleBehavior();
    gridBot.moveBehavior = new GridBotMoveBehavior();
    gridBot.start();

    let gridBotView = new GridBotView(gridBot);
    gridBotView.start();

    /*
    let gameGrid = new GameGrid(30, 20);
    createTestGrid2(gameGrid);
    for (let gridX = 0; gridX < gameGrid.width; gridX++) {
        for (let gridY = 0; gridY < gameGrid.height; gridY++) {
            drawWallsIfTheyExist(gameGrid, gridX, gridY, graphics, colorScheme);
        }
    }
    */

    app.stage.addChild(gridBotView.sprite);
    app.stage.addChild(graphics);

    //resizeCanvas();
    app.stage.interactive = true;

    let elapsed = 0.0;
    app.ticker.add((delta) => {
        elapsed += delta;

        gridBot.update();
        gridBotView.update()

    });
};

function drawWallsIfTheyExist(gameGrid: GameGrid, gridX: number, gridY: number, graphics: Graphics, colorScheme: number[]) {
    let gridCell: GameGridCell = gameGrid.getCell(gridX, gridY);
    let x = gridCell.col * GameConstants.gridWidth;
    let y = gridCell.row * GameConstants.gridHeight;

    if (gridCell.content === GameGridCellContent.Wall) {
        graphics.lineStyle(2, colorScheme[1], 1);
        graphics.beginFill(colorScheme[2]);
        graphics.drawRect(x, y, GameConstants.gridWidth, GameConstants.gridHeight);
        graphics.endFill();
    }
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}


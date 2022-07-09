import { Application, Loader, Graphics } from "pixi.js";
import "./style.css";
import { GameConstants } from "./presentation/game-constants"
import { GameGrid } from "./core/entities/game-grid";
import { GameGridCell, GameGridCellContent } from "./core/entities/game-grid-cell";
import { Point2D } from "./core/entities/point";
import { BreadthFirstSearchService } from "./core/services/breadth-first-search-service";

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

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createTestGrid2(gameGrid: GameGrid) {
    for (let i = 0; i < 200; i++) {
        let x = getRandomInt(0, 29);
        let y = getRandomInt(0, 19);

        gameGrid.setGridCell(x, y, GameGridCellContent.Wall);
    }
}

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    let colorScheme = [0x161032, 0xfaff81, 0xffc53a, 0xe06d06, 0xb26700];

    document.body.appendChild(app.view);

    let gameGrid = new GameGrid(30, 20);
    createTestGrid2(gameGrid);

    let service = new BreadthFirstSearchService();

    let start = new Point2D(0, 0);
    let end = new Point2D(29, 19);

    gameGrid.setGridCell(end.x, end.y, GameGridCellContent.Empty);

    let response = service.execute(gameGrid, start, end);

    const graphics = new Graphics();
    for (let gridX = 0; gridX < gameGrid.width; gridX++) {
        for (let gridY = 0; gridY < gameGrid.height; gridY++) {
            drawWallsIfTheyExist(gameGrid, gridX, gridY, graphics, colorScheme);
        }
    }

    for (let cell of response) {
        let x = cell.col * GameConstants.gridWidth;
        let y = cell.row * GameConstants.gridHeight;

        graphics.lineStyle(2, colorScheme[2], 1);
        graphics.beginFill(colorScheme[3]);
        graphics.drawRect(x, y, GameConstants.gridWidth, GameConstants.gridHeight);
        graphics.endFill();
    }

    app.stage.addChild(graphics);
    resizeCanvas();
    app.stage.interactive = true;
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

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("rabbit", "./assets/simpleSpriteSheet.json");
        loader.add("pixie", "./assets/spine-assets/pixie.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
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


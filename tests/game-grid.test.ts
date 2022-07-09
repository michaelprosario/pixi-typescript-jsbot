import { GameGrid } from "../src/core/entities/game-grid";
import { GameGridCellContent } from "../src/core/entities/game-grid-cell";
import { Point2D } from "../src/core/entities/point";
import { BreadthFirstSearchService } from "../src/core/services/breadth-first-search-service";

test("GameGrid setup", () => {
    // arrange
    // act
    let gameGrid = new GameGrid(30, 20);

    // assert
    expect(gameGrid.width).toBe(30);
    expect(gameGrid.height).toBe(20);
});

test("GameGrid__setContent__testValidInputs", () => {
    // arrange
    let gameGrid = new GameGrid(30, 20);

    // act
    gameGrid.setGridCell(10, 5, GameGridCellContent.Wall);

    // assert
    expect(gameGrid.grid[10][5].content).toBe(GameGridCellContent.Wall);
});

test("GameGrid__printOut", () => {
    // arrange
    let gameGrid = new GameGrid(30, 20);
    createTestGrid(gameGrid);

    // act
    gameGrid.printOut();
});

test("GameGrid__getAdjacentCells__UpperLeftCell", () => {
    let gameGrid = new GameGrid(30, 20);
    createTestGrid(gameGrid);
    let response = gameGrid.getAdjacentCells(0, 0);
    expect(response.length).toBe(2);
});

test("GameGrid__getAdjacentCells__LowerRightCell", () => {
    let gameGrid = new GameGrid(30, 20);
    createTestGrid(gameGrid);
    let response = gameGrid.getAdjacentCells(29, 19);
    expect(response.length).toBe(1);
});

test("GameGrid__getAdjacentCells__UpperRightCell", () => {
    let gameGrid = new GameGrid(30, 20);
    createTestGrid(gameGrid);
    let response = gameGrid.getAdjacentCells(29, 0);
    expect(response.length).toBe(2);
});

test("GameGrid__getAdjacentCells__UpperRightCell", () => {
    let gameGrid = new GameGrid(30, 20);
    createTestGrid(gameGrid);
    let response = gameGrid.getAdjacentCells(29, 0);
    expect(response.length).toBe(2);
});

test("GameGrid__getAdjacentCells__CellTwoTwo", () => {
    let gameGrid = new GameGrid(30, 20);
    createTestGrid(gameGrid);
    let response = gameGrid.getAdjacentCells(2, 2);
    expect(response.length).toBe(4);
});

test("GameGrid__getAdjacentCells__CellTwoTwo", () => {
    let gameGrid = new GameGrid(30, 20);
    createTestGrid(gameGrid);
    let response = gameGrid.getAdjacentCells(4, 4);
    expect(response.length).toBe(3);
});

test("BreadthFirstSearchService__execute__doValidInputs", () => {
    let gameGrid = new GameGrid(30, 20);
    createTestGrid(gameGrid);

    let service = new BreadthFirstSearchService();

    let start = new Point2D(0, 0);
    let end = new Point2D(29, 19);

    let response = service.execute(gameGrid, start, end);

    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(0);
});

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

import { GameGrid } from "../entities/game-grid";
import { GameGridCell } from "../entities/game-grid-cell";
import { Point2D } from "../entities/point";
import { Ensure } from "./ensure";
import { Queue } from "./queue";

export class BreadthFirstSearchService {

    execute(gameGrid: GameGrid, startCell: Point2D, goalCell: Point2D): GameGridCell[] {
        Ensure.objectNotNull(gameGrid, "gameGrid is required");
        Ensure.objectNotNull(startCell, "startCell is required");
        Ensure.objectNotNull(goalCell, "goalCell is required");

        gameGrid.resetExploreFlags();
        let queue = new Queue();
        let rootCell = gameGrid.getCellFromPoint(startCell);
        rootCell.explored = true;
        queue.enqueue(rootCell);
        let finalCell: GameGridCell | undefined;

        while (queue.length > 0) {
            let currentCell = queue.dequeue() as GameGridCell;

            // if we found the goal cell
            if (currentCell.col == goalCell.x && currentCell.row == goalCell.y) {
                finalCell = currentCell;
            }

            let neighbors = gameGrid.getAdjacentCells(currentCell.col, currentCell.row);
            this.exploreNeighbors(neighbors, currentCell, queue);
        }

        if (finalCell)
            return this.makePathList(goalCell, gameGrid);
        else
            return [];
    }

    private exploreNeighbors(neighbors: GameGridCell[], currentCell: GameGridCell, queue: Queue) {
        for (const cell of neighbors) {
            if (!cell.explored) {
                cell.explored = true;
                cell.parentCell = currentCell;
                queue.enqueue(cell);
            }
        }
    }

    makePathList(goal: Point2D, grid: GameGrid): GameGridCell[] {
        Ensure.objectNotNull(goal, "goal is required");
        Ensure.objectNotNull(grid, "grid is required");

        let goalCell = grid.getCellFromPoint(goal);

        let stack = []

        let currentCell = goalCell;
        stack.push(currentCell);

        while (currentCell.parentCell) {
            currentCell = currentCell.parentCell;
            stack.push(currentCell);
        }

        return stack.reverse();
    }
}
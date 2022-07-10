import { GridBot } from '../../core/entities/grid-bot';
import { ISprite, ISpriteBehavior } from '../../core/interfaces/interfaces';
import { Ensure } from '../../core/services/ensure';
import { MathService } from '../../core/services/math-service';

export class GridBotMoveBehavior implements ISpriteBehavior {
    start(sprite: ISprite): void {
    }

    update(sprite: ISprite): void {
        console.log('move update', sprite);
        Ensure.objectNotNull(sprite, "sprite is required");

        let gridBot = sprite as GridBot;
        let theta = MathService.degreesToRadians(gridBot.heading);

        let deltaX = gridBot.forwardDelta * Math.cos(theta);
        let deltaY = gridBot.forwardDelta * Math.sin(theta);
        gridBot.x += deltaX;
        gridBot.y += deltaY;

        //gridBot.gridY--;

        gridBot.currentBehavior = gridBot.idleBehavior;
    }

    finish(sprite: ISprite): void {
    }
}

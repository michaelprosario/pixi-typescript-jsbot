import { GridBot } from '../../core/entities/grid-bot';
import { ISprite, ISpriteBehavior } from '../../core/interfaces/interfaces';
import { Ensure } from '../../core/services/ensure';
import { MathService } from '../../core/services/math-service';

export class GridBotMoveBehavior implements ISpriteBehavior {
    start(sprite: ISprite): void {
    }

    update(sprite: ISprite): void {

        Ensure.objectNotNull(sprite, "sprite is required");

        let gridBot = sprite as GridBot;
        let theta = MathService.degreesToRadians(gridBot.heading);

        let r = 1;

        let deltaX = r * Math.cos(theta);
        let deltaY = r * Math.sin(theta);

        gridBot.x += deltaX;
        gridBot.y += deltaY;

        setTimeout(() => {
            gridBot.currentBehavior = gridBot.idleBehavior;
        }, gridBot.forwardDelta);


        //gridBot.gridY--;


    }

    finish(sprite: ISprite): void {
    }
}

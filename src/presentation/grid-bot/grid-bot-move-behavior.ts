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

        let r = gridBot.forwardDelta;

        let deltaX = r * Math.cos(theta);
        let deltaY = r * Math.sin(theta);

        gridBot.x += deltaX;
        gridBot.y += deltaY;

        gridBot.currentBehavior = gridBot.idleBehavior;
    }

    finish(sprite: ISprite): void {
    }
}

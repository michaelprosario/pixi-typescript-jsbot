import { GridBot } from '../../core/entities/grid-bot';
import { ISprite, ISpriteBehavior } from '../../core/interfaces/interfaces';
import { Ensure } from '../../core/services/ensure';
import { MathService } from '../../core/services/math-service';

export class GridBotTurnBehavior implements ISpriteBehavior {
    finish(sprite: ISprite): void {
        throw new Error('Method not implemented.');
    }
    start(sprite: ISprite): void {
    }

    update(sprite: ISprite): void {

        Ensure.objectNotNull(sprite, "sprite is required");

        let gridBot = sprite as GridBot;
        if (gridBot.isMovingLeft) {
            gridBot.heading -= gridBot.turnAngle;
        } else {
            gridBot.heading += gridBot.turnAngle;
        }

        setTimeout(() => {
            gridBot.currentBehavior = gridBot.idleBehavior;
        }, 1000);

        //gridBot.gridY--;
    }

}

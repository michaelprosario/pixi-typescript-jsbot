import { GridBot } from '../../core/entities/grid-bot';
import { BotDirection } from '../../core/enums/bot-direction';
import { ISprite, ISpriteBehavior } from '../../core/interfaces/interfaces';
import { Ensure } from '../../core/services/ensure';

export class GridBotMoveBehavior implements ISpriteBehavior {
    start(sprite: ISprite): void {
    }

    update(sprite: ISprite): void {
        console.log('move update', sprite);
        Ensure.objectNotNull(sprite, "sprite is required");

        let gridBot = sprite as GridBot;
        if (gridBot.direction === BotDirection.North) {
            gridBot.y -= gridBot.gridCellWidth;
        }
        else if (gridBot.direction === BotDirection.South) {
            gridBot.y += gridBot.gridCellWidth;
        } else if (gridBot.direction === BotDirection.East) {
            gridBot.x += gridBot.gridCellWidth;
        } else if (gridBot.direction === BotDirection.West) {
            gridBot.x -= gridBot.gridCellWidth;
        } else {
            throw new Error("GridBotMoveBehavior / update / direction must be defined");
        }

        gridBot.currentBehavior = gridBot.idleBehavior
    }

    finish(sprite: ISprite): void {
    }
}

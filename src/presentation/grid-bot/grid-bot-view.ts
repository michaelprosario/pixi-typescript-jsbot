import { Sprite } from "@pixi/sprite";
import { ObservablePoint } from "pixi.js";
import { GridBot } from "../../core/entities/grid-bot";
import { BotDirection } from "../../core/enums/bot-direction";

export class GridBotView {
    start() {
        document.addEventListener('keydown', keyEventArgs => {
            if (keyEventArgs.key === 'w') {
                this.gridBot.moveForward();
            }

            if (keyEventArgs.key === 'a') {
                this.gridBot.moveLeft();
            }

            if (keyEventArgs.key === 'd') {
                this.gridBot.moveRight();
            }
        });
    }
    sprite: Sprite;
    constructor(private gridBot: GridBot) {
        this.sprite = Sprite.from('assets/grid-bot.png')
        let offset = gridBot.gridCellWidth / 2;
        this.sprite.pivot.x = offset;
        this.sprite.pivot.y = offset;
        this.update();
    }

    update() {
        this.sprite.x = this.gridBot.x;
        this.sprite.y = this.gridBot.y;
        this.sprite.width = this.gridBot.gridCellWidth;
        this.sprite.height = this.gridBot.gridCellWidth;

        if (this.gridBot.direction === BotDirection.East) {
            this.sprite.angle = 0;
        } else if (this.gridBot.direction === BotDirection.West) {
            this.sprite.angle = -180;
        } else if (this.gridBot.direction === BotDirection.North) {
            this.sprite.angle = -90;
        } else if (this.gridBot.direction === BotDirection.South) {
            this.sprite.angle = 90;
        }
    }
}
import { Sprite } from "@pixi/sprite";
import { GridBot } from "../../core/entities/grid-bot";

export class GridBotView {
    start() {
        document.addEventListener('keydown', keyEventArgs => {
            if (keyEventArgs.key === 'ArrowUp') {
                this.gridBot.moveForward();
            }
        });
    }
    sprite: Sprite;
    constructor(private gridBot: GridBot) {
        this.sprite = Sprite.from('assets/grid-bot.png')
        this.update();
    }

    update() {
        this.sprite.x = this.gridBot.x;
        this.sprite.y = this.gridBot.y;
        this.sprite.width = this.gridBot.gridCellWidth;
        this.sprite.height = this.gridBot.gridCellWidth;
    }
}
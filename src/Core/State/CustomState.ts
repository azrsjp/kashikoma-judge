// 本ゲームのStateは全てこのStateをベースとする

import {Coord} from "Core/Coord";

export class CustomState extends Phaser.State {

    init () {
        Coord.updateCanvasAndWorldSize(this.game);
    }

    resize() {
        if (!this.game.state.created) {
            return;
        }
        this.adjust();
    }

    adjust() {
    }
}
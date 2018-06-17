import {CustomState} from "Core/State/CustomState";

export class BootState extends CustomState {

    init() {
        
    }

    preload() {
        // Preloadで使う画像をロード
    }

    create() {
        this.game.state.start("PreloadState");
    }
}
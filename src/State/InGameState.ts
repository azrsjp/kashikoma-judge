import { CustomState } from "Core/State/CustomState";
// import { Res } from "Constants/Resources";

export class InGameState extends CustomState {

    constructor() {
        super();
    }

    init() {
        super.init();

        this.game.stage.backgroundColor = 0x000;
    }

    shutdown() {
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.UP);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.LEFT);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.RIGHT);
    }

    preload() {
        // this.game.load.image(Res.ImageName.key, Res.ImageName.path);
    }

    create() {
        const keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyUp.onDown.add(this.onKeyUpDown, this);

        const keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyLeft.onDown.add(this.onKeyLeftDown, this);

        const keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keyRight.onDown.add(this.onKeyRightDown, this);
    }

    update() {
    }

    private onKeyUpDown() {
    }

    private onKeyLeftDown() {
    }

    private onKeyRightDown() {
    }
}
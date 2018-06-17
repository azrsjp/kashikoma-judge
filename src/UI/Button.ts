import { Res } from "Constants/Resources";
import { UISettings } from "Constants/UISettings";

export class Button extends Phaser.Group {
    private bg: Phaser.Button;
    private text: Phaser.Text;

    constructor(game: Phaser.Game, name: string) {
        super(game, null);

        this.bg = new Phaser.Button(game, 0, 0, Res.btn_round.key);
        this.bg.tint = UISettings.Colors.white;
        this.addChild(this.bg);

        const textStyle = UISettings.fontStyle(13, UISettings.Colors.black, UISettings.Font.hiraginoGothW6);
        this.text = new Phaser.Text(game, 0, 0, name, textStyle);
        this.text.resolution = window.devicePixelRatio;
        this.addChild(this.text);

        this.adjust();
    }

    setOnClickedCallback(callback: Function) {
        this.bg.onInputUp.add(callback);
    }

    private adjust() {
        const width = 220;
        const height = 40;

        this.bg.anchor.setTo(0, 0);
        this.bg.position.setTo(0, 0);
        this.bg.setSize(width, height);

        this.text.anchor.setTo(0.5, 0.5);
        this.text.position.setTo(width * 0.5, height * 0.5 + 3);
    }
}
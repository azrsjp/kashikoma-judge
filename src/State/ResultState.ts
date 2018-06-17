import { Res } from "Constants/Resources";
import { CustomState } from "Core/State/CustomState";
import { Coord } from "Core/Coord";
import { Button } from "UI/Button";

export class ResultState extends CustomState {

    private scoreText: Phaser.Text;
    private text: Phaser.Text;
    private score: number = 0;

    private retryButton: Button;
    private shareButton: Button;

    constructor() {
        super();
    }

    init() {
        super.init();

        this.score = arguments[0];

        this.game.stage.backgroundColor = 0xDDDDDD;

        this.text = this.game.add.text(10, 10, "Result", { font: '32px', fill: '#555' });
        this.text.anchor.setTo(0.5, 0);
        this.text.position.setTo(Coord.worldCenterX, 20);
        this.scoreText = this.game.add.text(10, 10, "らぁらちゃんを " + this.score + " 人出荷しました!", { font: '18px', fill: '#555' });
        this.scoreText.anchor.setTo(0.5, 0);
        this.scoreText.position.setTo(Coord.worldCenterX, 120);
        this.scoreText.resolution = window.devicePixelRatio;

        this.retryButton = new Button(this.game, "もう一度遊ぶ");
        this.retryButton.setOnClickedCallback(() => {
            this.game.state.start("StartState");
        });
        this.retryButton.position.setTo(Coord.worldCenterX - 110, Coord.worldHeight - (this.retryButton.height + 10) * 2 - 10);
        this.game.add.existing(this.retryButton);

        this.shareButton = new Button(this.game, "Tweet");
        this.shareButton.setOnClickedCallback(() => {
            this.tweet();
        });
        this.shareButton.position.setTo(Coord.worldCenterX - 110, Coord.worldHeight - (this.retryButton.height + 10) * 1 - 10);
        this.game.add.existing(this.shareButton);
    }

    preload() {
    }

    create() {
    }

    private tweet() {
        const score = this.score;
        const twitter = "http://twitter.com/share"
        const url = location.href.toString();
        const hashtag = "かしこまジャッジ,らぁらちゃん可愛い";
        const text = 'かしこまジャッジ遊んだ結果，' + score + '人のらぁらちゃんを出荷できました!';

        window.location.href = twitter + '?url=' + url + '&hashtags=' + hashtag + '&text=' + text;
    }
}
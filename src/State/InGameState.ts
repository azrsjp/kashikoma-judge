import { CustomState } from "Core/State/CustomState";
import { Coord } from "Core/Coord";
import { Res } from "Constants/Resources";
import { FlickDetector } from "Model/FlickDetector";
import { Laala } from "UI/Laala";
import { UISettings } from "Constants/UISettings";
import { TimeBar } from "UI/TimeBar";

export class InGameState extends CustomState {

    static NumLaala: number = 5;
    static NumBufferedLaala: number = InGameState.NumLaala + 2;
    static LaalaInterval: number = Coord.worldWidth / (InGameState.NumLaala - 1);
    static LaneWidth: number = InGameState.LaalaInterval * (InGameState.NumBufferedLaala - 1);
    static LaalaDestX: number = (Coord.worldWidth - InGameState.LaneWidth) * 0.5;
    static LaalaOriginX: number = (Coord.worldWidth + InGameState.LaneWidth) * 0.5;
    static ReminingTime: number = 20 * 1000;

    private flickDetector: FlickDetector;
    private laala: Laala[] = [];
    private lane: Phaser.Sprite;
    private line: Phaser.Sprite;
    private currentTarget: number;
    private score: number;
    private scoreText: Phaser.Text;
    private reminingTimeText: Phaser.Text;
    private isGameOver: boolean;
    private gameOverTime: number;
    private timeBar: TimeBar;
    private ticketNum: number;

    private frontLane: Phaser.Sprite;
    private backLane: Phaser.Sprite;

    // 残り時間バー
    private reminingTimeBar: Phaser.Sprite;
    private reminingTimeBarBack: Phaser.Sprite;

    constructor() {
        super();
    }

    init() {
        super.init();

        this.game.stage.backgroundColor = 0xDDDDDD;
        this.flickDetector = new FlickDetector(this.game, () => {this.onTapped() }, () => {this.onFlicked() });
    }

    shutdown() {
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.UP);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.LEFT);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.RIGHT);
    }

    preload() {
        this.game.load.image(Res.btn_round.key, Res.btn_round.path);
    }

    create() {
        const keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyLeft.onDown.add(this.onKeyLeftDown, this);

        const keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keyRight.onDown.add(this.onKeyRightDown, this);

        this.scoreText = this.game.add.text(0, 0, "", UISettings.Font.hiraginoGothW6);
        this.scoreText.fontSize = 14.0;
        this.scoreText.resolution = window.devicePixelRatio;
        this.scoreText.anchor.setTo(1.0, 0.0);
        this.scoreText.position.setTo(Coord.worldWidth - 5.0, 20.0);

        this.reminingTimeText = this.game.add.text(0, 0, "", UISettings.Font.hiraginoGothW6);
        this.reminingTimeText.fontSize = 14.0;
        this.reminingTimeText.resolution = window.devicePixelRatio;
        this.reminingTimeText.position.setTo(5.0, 20.0);

        this.timeBar = new TimeBar(this.game, 0x000000, 0xFFFFFF, Coord.worldWidth, 15);
        this.timeBar.setRatio(1.0);
        this.game.add.existing(this.timeBar);

        // レーンの生成
        this.lane = this.game.add.sprite(0, 0, Res.btn_round.key);
        this.lane.tint = 0x999999;
        this.lane.setSize(Coord.worldWidth + 100, 163);
        this.lane.position.setTo(0, 192);
    
        this.backLane = this.game.add.sprite(0, 0, Res.lane_back.key);
        this.backLane.position.setTo(0.0, 80);
        this.backLane.setWidth(70);

        // らぁらちゃんを5+2人生成
        for (let i = 0; i < InGameState.NumBufferedLaala; ++i) {
            this.laala[i] = new Laala(this.game, (i + 1), (laala: Laala) => this.killAndGenerateLaala(laala) );
            this.laala[i].position.setTo(InGameState.LaalaDestX + InGameState.LaalaInterval * i, 180);
            this.game.add.existing(this.laala[i]);
            
            // 初期状態先頭の3人はいるけど透明にしていなかったことにする
            if (i <= 3) {
                this.laala[i].visible = false;
            }
        }

        this.frontLane = this.game.add.sprite(0, 0, Res.lane_front.key);
        this.frontLane.position.setTo(0.0, 80);
        this.frontLane.setWidth(70);


        this.line = this.game.add.sprite(0, 0, Res.btn_round.key);
        this.line.tint = 0x555555;
        this.line.setSize(Coord.worldWidth + 100, 2);
        this.line.position.setTo(0, 257.0);

        // 初期状態
        this.isGameOver = false;
        this.currentTarget = 3;
        this.score = 0;
        this.ticketNum = 0;
        this.displayScore(this.score);
        this.gameOverTime = new Date().getTime() + InGameState.ReminingTime;

        // 最初のアニメーション
        this.progress();
    }

    update() {
        if (this.isGameOver) {
            this.game.state.start("ResultState", true, false, this.score);
        } else {
            this.updateReminingTime();
        }
        this.updateReminingTime();
    }

    private countUpScore(): number {
        this.score += 1;
        return this.score;
    }

    private updateReminingTime() {
        const currentTime = new Date().getTime();
        const reminingTime = this.gameOverTime - currentTime;
        if (reminingTime <= 0) {
            this.isGameOver = true;
        }

        const ratio = reminingTime / InGameState.ReminingTime;
        this.timeBar.setRatio(ratio);
        this.displayReminingTime(Math.ceil(reminingTime / 1000));
    }

    private displayReminingTime(time: number) {
        this.reminingTimeText.text = "残り時間:" + time;
    }

    private displayScore(score: number) {
        this.scoreText.text = "Score:" + this.score.toString();
    }

    private progress() {
        if (!this.laala.every(e => e.isLaalaReady())) {
            return;
        }

        const previousTarget = this.currentTarget;
        this.currentTarget = this.updateTarget();

        for (let i = 0; i < this.laala.length; ++i) {
            this.laala[i].moveForward(-InGameState.LaalaInterval);

            this.laala[previousTarget].hideSerif();
        }

        
        this.laala[this.currentTarget].showSerif();
    }

    private updateTarget() {
        return (this.currentTarget + 1) % InGameState.NumBufferedLaala;
    }

    private killAndGenerateLaala(laalaToKill: Laala) {
        for (let i = 0; i < this.laala.length; ++i) {
            if (laalaToKill == this.laala[i]) {
                this.game.world.remove(this.laala[i]);
                this.laala[i] = new Laala(this.game, InGameState.NumBufferedLaala, (laala: Laala) => this.killAndGenerateLaala(laala) );
                this.laala[i].position.setTo(InGameState.LaalaOriginX, 180);
                this.game.add.existing(this.laala[i]);
                console.log("killedAt", i);
                this.frontLane.bringToTop();
                return;
            }
        }
    }

    private selectRightLaala() {
        if (this.laala[this.currentTarget].isRightLaala()) {
            this.displayScore(this.countUpScore());
            this.progress();
        } else {
            // ゲーオーバー
            console.log("GameOver");
            this.isGameOver = true;
        }
    }

    private selectBadLaala() {
        if (!this.laala[this.currentTarget].isRightLaala()) {
            this.ticketNum += 1;
            this.laala[this.currentTarget].showTicket(this.ticketNum);
            this.displayScore(this.countUpScore());
            this.progress();
        } else {
            // ゲーオーバー
            console.log("GameOver");
            this.isGameOver = true;
        }
    }

    // PC版操作
    private onKeyLeftDown() {
        this.selectRightLaala();   
    }

    private onKeyRightDown() {
        this.selectBadLaala();
    }

    // スマホ版操作
    private onTapped() {
        this.selectRightLaala();
    }

    private onFlicked() {
        this.selectBadLaala();
    }
}
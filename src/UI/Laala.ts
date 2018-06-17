import { Res } from "Constants/Resources";
import { UISettings } from "Constants/UISettings";

export class Laala extends Phaser.Group {
    private laala: Phaser.Sprite;
    private ticket: Phaser.Sprite;
    private wordBalloon: Phaser.Sprite;
    private ticketText: Phaser.Text;
    private isKashikoma: boolean;
    private isReady: boolean;
    private killMeCallback: (laala: Laala) => void = null;
    private life: number;

    constructor(game: Phaser.Game, life: number, killMeCallback: (laala: Laala) => void) {
        super(game, null);

        this.life = life;
        this.killMeCallback = killMeCallback;

        // 正規らぁらちゃんか否か
        this.isKashikoma = Math.floor(Math.random() * 2) == 0;

        // らぁらちゃん
        this.laala = new Phaser.Sprite(game, 0, 0, Res.lalla1.key);
        this.laala.setWidth(70);
        this.laala.anchor.setTo(0.5, 0.0);
        this.addChild(this.laala);

        // かしこま！の吹き出し
        this.wordBalloon = new Phaser.Sprite(game, 0, 0, this.isKashikoma ? Res.balloon_kashikoma.key : Res.balloon_kashikomari.key);
        this.wordBalloon.setSize(0, 0);
        this.wordBalloon.anchor.setTo(0.5, 1);
        this.wordBalloon.position.setTo(0, 0);
        this.wordBalloon.visible = false;
        this.addChild(this.wordBalloon);

        this.isReady = true;
    }

    isLaalaReady(): boolean {
        return this.isReady;
    }

    // 正しいらぁら
    isRightLaala(): boolean {
      return this.isKashikoma;
    }

    // かしこまと鳴け
    showSerif() {
      this.wordBalloon.visible = true;
      this.changeFace();

      this.game.add.tween(this.wordBalloon.scale)
          .to({x: 0.2, y: 0.2}, 150, Phaser.Easing.Quartic.Out)
          .start();
    }
  
    hideSerif() {
      this.game.add.tween(this.wordBalloon.scale)
          .to({x: 0.0, y: 0.0}, 150, Phaser.Easing.Quartic.Out)
          .start()
          .onComplete.addOnce(() => { this.wordBalloon.visible = false });
    }

    // 前に進むよ
    moveForward(offset: number) {
        this.isReady = false;
    
        this.game.add.tween(this.position)
            .to({x: this.position.x + offset, y: this.position.y}, 150, Phaser.Easing.Quartic.Out)
            .start()
            .onComplete.addOnce(() => {
                this.minusLife();
                this.isReady = true;
            });
    }

    showTicket(num: number) {
        // Ticket
        this.ticket = new Phaser.Sprite(this.game, 0, 0, Res.ticket.key);
        this.ticket.setWidth(70);
        this.ticket.position.setTo(0.0, -30.0);
        this.ticket.anchor.setTo(0.5, 0.0);
        this.addChild(this.ticket);

        this.game.add.tween(this.ticket.position)
            .to({x: 0.0, y: 0.0}, 300, Phaser.Easing.Quartic.Out)
            .start();

        this.ticketText = new Phaser.Text(this.game, 0, 0, num.toString());
        this.ticketText.fontSize = 14.0;
        this.ticketText.resolution = window.devicePixelRatio;
        this.ticketText.anchor.setTo(0.5, 0.0);
        this.ticketText.position.setTo(-3.0, -10.0);
        this.addChild(this.ticketText);
    
        this.game.add.tween(this.ticketText.position)
        .to({x: -3.0, y: 20.0}, 300, Phaser.Easing.Quartic.Out)
        .start();
    }

    private changeFace() {
        this.remove(this.laala);
        this.laala = new Phaser.Sprite(this.game, 0, 0, Res.lalla2.key);
        this.laala.setWidth(70);
        this.laala.anchor.setTo(0.5, 0.0);
        this.addChild(this.laala);
    }

    private minusLife() {
        this.life -= 1;

        if (this.life <= 0) {
            if (this.killMeCallback) {
                this.killMeCallback(this);
            }
        }
    }
}
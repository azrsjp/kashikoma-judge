export class FlickDetector {
  private static FlickThrethold: number = 70;
  private isDown: boolean = false;
  private lock: boolean = false;
  private game: Phaser.Game;
  private onFlicked: () => void;
  private onTapped: () => void;

  constructor(game: Phaser.Game, onTapped: () => void, onFlicked: () => void) {
    this.game = game;
    this.onTapped = onTapped;
    this.onFlicked = onFlicked;

    game.input.maxPointers = 1;
    game.input.addMoveCallback(this.onMove, this);
    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
  }
  
  private onMove(pointer: Phaser.Pointer) {
    if (!this.isDown || this.lock) {
        return;
    }
    const distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
    const isOverThretholdDistance = distance > FlickDetector.FlickThrethold;

    if (isOverThretholdDistance) {
        this.onFlicked();
        this.lock = true;
    }
}

private onDown(pointer: Phaser.Pointer) {
    this.isDown = true;
}

private onUp(pointer: Phaser.Pointer) {
    if (this.lock) {
        this.lock = false;
        this.isDown = false;
        return;
    }
    this.isDown = false;

    const distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
    const isInThretholdDistance = distance <= FlickDetector.FlickThrethold;

    if (isInThretholdDistance) {
      this.onTapped();
    }
}
}
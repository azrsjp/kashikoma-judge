export class TimeBar extends Phaser.Group {
    private bar: Phaser.Sprite;
    private barBg: Phaser.Sprite;
    private defaultWidth: number;
    private defaultHeight: number;

    constructor(game: Phaser.Game, color: number, bgColor: number, width: number, height: number) {
        super(game, null);

        this.defaultWidth = width;
        this.defaultHeight = height;
        {
            let colorRgb = Phaser.Color.getRGB(bgColor);
            let colorBmp = game.add.bitmapData(width, height);
            colorBmp.fill(colorRgb.r, colorRgb.g, colorRgb.b);
            this.barBg = new Phaser.Sprite(game, 0, 0, colorBmp);
            this.barBg.setSize(width, height);
            this.addChild(this.barBg);
        }
        {
            let colorRgb = Phaser.Color.getRGB(color);
            let colorBmp = game.add.bitmapData(width, height);
            colorBmp.fill(colorRgb.r, colorRgb.g, colorRgb.b);
            this.bar = new Phaser.Sprite(game, 0, 0, colorBmp);
            this.bar.setSize(width, height);
            this.addChild(this.bar);
        }
    }

    setRatio(remining: number) {
        this.bar.setSize(this.defaultWidth * remining, this.defaultHeight);
    }
}
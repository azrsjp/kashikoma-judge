// 拡張メソッド
// setWidth, setHeightはアスペクト比を保ったままサイズを変更する

declare module Phaser {
    interface Sprite {
        setSize(width: number, height: number): void;
        setWidth(width: number): void;
        setHeight(height: number): void;
    }
}

Phaser.Sprite.prototype.setSize = function (width: number, height: number) {
    this.width = width;
    this.height = height;
};

Phaser.Sprite.prototype.setWidth = function (width: number) {
    this.width = width;
    this.scale.setTo(this.scale.x);
};

Phaser.Sprite.prototype.setHeight = function (height: number) {
    this.height = height;
    this.scale.setTo(this.scale.y);
};

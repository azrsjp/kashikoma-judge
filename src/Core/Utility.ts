export namespace Utility {
    export function zeroPadding(num: number,length: number): string {
        return ('0000000000' + num).slice(-length);
    }

    export function magnitude(vector: Phaser.Point): number {
        return Math.pow(vector.x * vector.x + vector.y * vector.y, 0.5);
    }

    export function normalize(vector: Phaser.Point): Phaser.Point {
        const legnth = magnitude(vector);
        return new Phaser.Point(vector.x / legnth, vector.y / legnth);
    }

    export function makeVector(to: Phaser.Point, from: Phaser.Point) {
        return new Phaser.Point(to.x - from.x, to.y - from.y);
    }
}
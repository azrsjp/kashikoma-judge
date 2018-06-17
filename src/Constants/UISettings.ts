// UIに関する定数定義

export namespace UISettings {
    // ブラウザのウインドウイズがこの比率の範囲ならフルスクリーン表示
    export const minCanvasRatio = 12.0 / 9.0;
    export const maxCanvasRatio = 16.0 / 9.0;

    // 物理サイズがいかなる場合でもゲーム内の論理座標系の横幅が常に320になるように指定
    // この値とブラウザの物理サイズによって対応する高さが動的にきまる。高さはCoord.worldHeight()で取得可能。
    export const expectedWidth = 320;

    // Phaser.Textのスタイルに指定するObjectを簡単に生成するためのUtility
    type Font = "ヒラギノ角ゴ Pro W6";
    export namespace Font{
        export const hiraginoGothW6: Font = "ヒラギノ角ゴ Pro W6"
    }
    export function fontStyle(size: number, color: number, family: Font): any {
        const font = size.toString() + "px " + family;
        const fill = Phaser.Color.getWebRGB(color);
        return { font: font, fill: fill };
    }

    export namespace Colors {
        export const white = 0xFFFFFF;
        export const black = 0x000000;
    }
}
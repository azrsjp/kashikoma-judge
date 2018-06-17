import {UISettings} from "Constants/UISettings";

// 座標変換ユーティリティ
// worldとは論理座標系，canvasとはHTMLやCSSでCanvasタグに指定する実際の広さによって表現される座標系である
// 環境によってCanvasの大きさが変化するので，UIやゲームオブジェクトの配置などは一旦論理座標で表現し，最終的にレンダリングするときにCanvas座標に戻す
// PhaserのAPIに渡す値はcanvas座標系である

export class Coord {
    // public

    // 回転やウインドウサイズの変更が起こった際などに呼び，新しいCanvas及びWorldサイズを設定する
    static updateCanvasAndWorldSize(game: Phaser.Game) {
        this.calcCanvasSize();
        
        // HTML要素にScaleFactor倍されたCanvasサイズを指定し，CSSでScaleFactor倍率分縮小する
        // これで画面がぼやけると言うことがなくなる
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.setUserScale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio); // HTML要素に対するCSS指定の大きさ

        // 新しいCanvasサイズ適用
        game.scale.setGameSize(this.canvasWidth, this.canvasHeight);

        // オブジェクトの大きさや位置をWorld座標として扱えるようScaling
        game.world.scale = new Phaser.Point(1 / this.getWorldScale, 1 / this.getWorldScale);

        // 必要であればStateでオブジェクトの配置を再計算
        const currentState = game.state.getCurrentState();
        if (currentState instanceof Phaser.State) {
            currentState.resize();
        }
    }

    // scale
    static get getWorldScale(): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return this.cachedWorldWidth / this.cachedCanvasWidth;
    }

    // ゲームにおける論理座標系の横幅
    static get worldWidth(): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return this.cachedWorldWidth;
    }

    // ゲームにおける論理座標系の高さ
    static get worldHeight(): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return this.cachedWorldHeight;
    }

    // ゲームにおける論理座標系の中心座標
    static get worldCenterX(): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return this.cachedWorldWidth * 0.5;
    }

    // ゲームにおける論理座標系の中心座標
    static get worldCenterY(): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return this.cachedWorldHeight * 0.5;
    }

    // htmlのcanvasに指定すべき横幅
    static get canvasWidth(): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return this.cachedCanvasWidth;
    }

    // htmlのcanvasに指定すべき高さ
    static get canvasHeight(): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return this.cachedCanvasHeight;
    }

    static get currentWorldRatio(): number {
        return this.worldHeight / this.worldWidth;
    }

    // Canvas座標から論理座標に変換する
    static worldPoint(point: Phaser.Point): Phaser.Point {
        return new Phaser.Point(this.toWorldX(point.x), this.toWorldY(point.y));
    }

    // Canvas座標から論理座標に変換する
    static toWorldX(canvasX: number): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return (canvasX / this.cachedCanvasWidth) * this.cachedWorldWidth;
    }

    // Canvas座標から論理座標に変換する
    static toWorldY(canvasY: number): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return (canvasY / this.cachedCanvasHeight) * this.cachedWorldHeight;
    }
    
    // 論理座標からCanvas座標に変換する
    static canvasPoint(point: Phaser.Point): Phaser.Point {
        return new Phaser.Point(this.toCanvasX(point.x), this.toCanvasY(point.y));
    }

　　// 論理座標からCanvas座標に変換する
    static toCanvasX(worldX: number): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return (worldX / this.cachedWorldWidth) * this.cachedCanvasWidth;
    }

    // 論理座標からCanvas座標に変換する
    static toCanvasY(worldY: number): number {
        if (!this.isInitialized) {
            this.calcCanvasSize();
        }
        return (worldY / this.cachedWorldHeight) * this.cachedCanvasHeight;
    }

    // private

    private static isInitialized = false;
    private static cachedCanvasWidth: number;
    private static cachedCanvasHeight: number;
    private static cachedWorldWidth: number;
    private static cachedWorldHeight: number;

    // ブラウザサイズが変わったらこれを呼び出すことで，ゲームのCanvasサイズの再計算を行う
    // ゲームにおいて座標に関する計算の呼び出し頻度が多いので1度計算後はキャッシュを利用するため，計算処理だけ分離した。
    private static calcCanvasSize() {
        this.calcCanvasWidth();
        this.calcCanvasHeight();
        this.calcWorldWidth();
        this.calcWorldHeight();
        this.isInitialized = true;
    }

    // ゲームの論理座標系の横幅を計算
    private static calcWorldWidth() {
        this.cachedWorldWidth = UISettings.expectedWidth;
    }

    // ゲームの論理座標系の縦幅を計算
    private static calcWorldHeight() {
        this.cachedWorldHeight = Math.floor(this.cachedWorldWidth * (this.cachedCanvasHeight / this.cachedCanvasWidth))
    }

    // 画面の比率に応じてCanvasタグに設定する横幅を計算
    private static calcCanvasWidth() {
        if (this.currentWindowRatio() < UISettings.minCanvasRatio) {
            this.cachedCanvasWidth = Math.floor(window.innerHeight / UISettings.minCanvasRatio);
        } else {
            this.cachedCanvasWidth = window.innerWidth;
        }

        // scaleFactor適用
        this.cachedCanvasWidth *= window.devicePixelRatio;
    }

    // 画面の比率に応じてCanvasタグに設定する高さを計算
    private static calcCanvasHeight() {
        if (this.currentWindowRatio() > UISettings.maxCanvasRatio) {
            this.cachedCanvasHeight = Math.floor(window.innerWidth * UISettings.maxCanvasRatio);
        } else {
            this.cachedCanvasHeight = window.innerHeight;
        }

        // scaleFactor適用
        this.cachedCanvasHeight *= window.devicePixelRatio;
    }

    private static currentWindowRatio(): number {
        return window.innerHeight / window.innerWidth;
    }
}
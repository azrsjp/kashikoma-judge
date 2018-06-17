/// <reference path="CustomizedDeps/phaser.d.ts"/>

// 依存ライブラリ
import 'pixi';
import 'p2';
import 'phaser';

// メソッド拡張宣言
import 'Extension/Image';
import 'Extension/Sprite';

import { Coord } from "Core/Coord";
import { BootState } from "State/BootState";
import { PreloadState } from "State/PreloadState";
import { StartState } from 'State/StartState';
import { InGameState } from 'State/InGameState';
import { ResultState } from 'State/ResultState';

// ゲームの初期化
const game = new Phaser.Game(Coord.canvasWidth, Coord.canvasHeight, Phaser.AUTO, "");

// ウインドウのリサイズや端末の回転が起こった際にCanvasサイズを適切に変更する
window.onresize = window.onorientationchange = () => {
    Coord.updateCanvasAndWorldSize(game);
};

// ユーザによる意図しない画面ズームを抑制する
document.addEventListener('touchstart', event => {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, true);

// State(他で言うところのシーン)の登録
game.state.add("BootState", BootState);
game.state.add("PreloadState", PreloadState);
game.state.add("StartState", StartState);
game.state.add("InGameState", InGameState);
game.state.add("ResultState", ResultState);

// エントリーポイントState開始
game.state.start("BootState");
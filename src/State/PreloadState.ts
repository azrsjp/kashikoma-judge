import {Res} from "Constants/Resources";
import {CustomState} from "Core/State/CustomState";

export class PreloadState extends CustomState {

    constructor() {
        super();
    }

    init() {
        super.init();
    }

    preload() {
        // アプリ全体で使う画像を画像をロード
        this.game.load.image(Res.btn_round.key, Res.btn_round.path);

        this.game.load.image(Res.balloon_kashikoma.key, Res.balloon_kashikoma.path);
        this.game.load.image(Res.balloon_kashikomari.key, Res.balloon_kashikomari.path);
        this.game.load.image(Res.lalla1.key, Res.lalla1.path);
        this.game.load.image(Res.lalla2.key, Res.lalla2.path);
        this.game.load.image(Res.lane_front.key, Res.lane_front.path);
        this.game.load.image(Res.lane_back.key, Res.lane_back.path);
        this.game.load.image(Res.ticket.key, Res.ticket.path);
    }

    create() {
        this.game.state.start("StartState");
    }
}
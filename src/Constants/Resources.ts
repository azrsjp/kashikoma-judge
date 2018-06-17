export class Resource {
    constructor(key: string, path: string) {
        this.key = key;
        this.path = path;
    }
    key: string;
    path: string;
}

export class Resources {
    constructor(key: string, pathList: string[]) {
        this.key = key;
        this.pathList = pathList;
    }
    key: string;
    pathList: string[];
}

// 画像やSEの定義はここで行う
export namespace Res {
    export const btn_round = new Resource('btn_round', 'img/btn_round.png');

    export const balloon_kashikoma = new Resource('balloon_kashikoma', 'img/balloon_kashikoma.png');
    export const balloon_kashikomari = new Resource('balloon_kashikomari', 'img/balloon_kashikomari.png');
    export const lalla1 = new Resource('lalla1', 'img/lalla1.png');
    export const lalla2 = new Resource('lalla2', 'img/lalla2.png');

    export const lane_front = new Resource('lane_front', 'img/lane_front.png');
    export const lane_back = new Resource('lane_back', 'img/lane_back.png');
    export const ticket = new Resource('ticket', 'img/ticket.png');

}
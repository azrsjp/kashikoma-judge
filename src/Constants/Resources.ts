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
}
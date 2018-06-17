import {Coord} from "Core/Coord";

export class ScrollElementGenerator {
    static gen(top: number, innerHTML: string): HTMLDivElement {

        var div = document.createElement('div');
        div.innerHTML = innerHTML;
        div.id = "scroll-content";
        div.style.overflow = "scroll";        
        this.arrangeElement(div, top);
        
        // 見た目に関してはここではなくmain.cssで #scroll-content に対してスタイルを指定する

        // Canvasの大きさを道連れにするので拡大操作禁止
        div.addEventListener('touchstart', event => {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, true);
        div.addEventListener('touchend', event => event.preventDefault(), false);

        const body = document.getElementsByTagName('body');
        body[0].appendChild(div);

        return div;
    }

    static arrangeElement(element: HTMLDivElement, top: number) {
        const width = Coord.canvasWidth / window.devicePixelRatio;
        const height = (Coord.canvasHeight - Coord.toCanvasY(top)) / window.devicePixelRatio;
    
        element.style.top = (Coord.toCanvasY(top) / window.devicePixelRatio).toString() + 'px';
        element.style.left = ((window.innerWidth - width) * 0.5).toString() + 'px';
        element.style.width = width + 'px';
        element.style.height = height.toString() + 'px';
    }
}
import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';

@Directive({
  selector: '[absolute-drag]'
})
export class AbsoluteDrag {

    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;

    constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {

    }

    ngAfterViewInit() {

        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');

        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

        hammer.on('pan', (ev) => {
          this.handlePan(ev);
        });

    }

    handlePan(ev){
        let width   = this.element.nativeElement.width;
        let height  = this.element.nativeElement.height;
        let styles  = getComputedStyle(this.element.nativeElement);

        if (styles.width.indexOf('px') !== -1 && styles.height.indexOf('px') !== -1 ){
            width   = parseInt(styles.width.replace(/[^0-9\.]+/g,''))
            height  = parseInt(styles.height.replace(/[^0-9\.]+/g,''))
        }

        let newLeft = ev.center.x;
        let newTop  = ev.center.y;

        this.domCtrl.write(() => {
            this.renderer.setElementStyle(this.element.nativeElement, 'left', ( newLeft -  width / 2 ) + 'px');
            this.renderer.setElementStyle(this.element.nativeElement, 'top', ( newTop- 50 - height/2  ) + 'px');
        });

    }

}
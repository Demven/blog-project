import { Component, HostBinding } from '@angular/core';
import './svg-sprite.pcss';

export const ICON = {
  DONE: 'symbol_done',
  REMOVE: 'symbol_remove',
  CLOSE: 'symbol_close',
};

@Component({
  selector: 'ds-svg-sprite',
  template: `
    <svg class="SvgSprite__svg">
      <symbol
        id="{{ICON.DONE}}"
        class="SvgSprite__done"
        viewBox="0 0 24 24"
      >
        <path class="SvgSprite__done__path" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
      </symbol>
      
      <symbol
        id="{{ICON.REMOVE}}"
        class="SvgSprite__remove"
        viewBox="0 0 24 24"
      >
        <path class="SvgSprite__remove__path" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
      </symbol>
      
      <symbol
        id="{{ICON.CLOSE}}"
        class="SvgSprite__close"
        viewBox="0 0 24 24"
      >
        <path class="SvgSprite__close__path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </symbol>
    </svg>
  `,
})
export default class SvgSprite {
  @HostBinding('class.SvgSprite') rootClass: boolean = true;

  public ICON:object = ICON;
}

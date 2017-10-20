import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import Label from './label/label';
import Modal from './modal/modal';
import SvgSprite from './svg-sprite/svg-sprite';
import Icon from './icon/icon';

@NgModule({
  imports: [
    RouterModule,
  ],
  declarations: [
    Label,
    Modal,
    SvgSprite,
    Icon,
  ],
  exports: [
    Label,
    Modal,
    SvgSprite,
    Icon,
    RouterModule,
  ],
})
export default class CommonModule {}

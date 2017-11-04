import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import Label from './label/label';
import Modal from './modal/modal';
import SvgSprite from './svg-sprite/svg-sprite';
import Icon from './icon/icon';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';

@NgModule({
  imports: [
    RouterModule,
  ],
  declarations: [
    Label,
    Modal,
    SvgSprite,
    Icon,
    Navbar,
    Footer,
  ],
  exports: [
    Label,
    Modal,
    SvgSprite,
    Icon,
    Navbar,
    Footer,
    RouterModule,
  ],
})
export default class CommonModule {}

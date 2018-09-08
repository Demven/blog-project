import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Label } from './label/label';
import { Modal } from './modal/modal';
import { SvgSprite } from './svg-sprite/svg-sprite';
import { Icon } from './icon/icon';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { KeepHtmlPipe } from './pipes/keep-html.pipe';

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
    KeepHtmlPipe,
  ],
  exports: [
    Label,
    Modal,
    SvgSprite,
    Icon,
    Navbar,
    Footer,
    KeepHtmlPipe,
    RouterModule,
  ],
})
export class CommonModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InViewportModule } from 'ng-in-viewport';
import { Label } from './label/label';
import { Modal } from './modal/modal';
import { SvgSprite } from './svg-sprite/svg-sprite';
import { Icon } from './icon/icon';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { KeepHtmlPipe } from './pipes/keep-html.pipe';
import { Yandex } from './analytics/yandex';

@NgModule({
  imports: [
    RouterModule,
    InViewportModule,
  ],
  declarations: [
    Label,
    Modal,
    SvgSprite,
    Icon,
    Navbar,
    Footer,
    KeepHtmlPipe,
    Yandex,
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
    Yandex,
  ],
})
export class CommonModule {}

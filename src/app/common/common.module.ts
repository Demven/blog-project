import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { InViewportModule } from 'ng-in-viewport';
import { Label } from './label/label';
import { Modal } from './modal/modal';
import { SvgSprite } from './svg-sprite/svg-sprite';
import { Icon } from './icon/icon';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Embed } from './embed/embed';
import { Sparkles } from './sparkles/sparkles';
import { Badge } from './badge/badge';
import { KeepHtmlPipe } from './pipes/keep-html.pipe';
import { Yandex } from './analytics/yandex';

@NgModule({
  imports: [
    AngularCommonModule,
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
    Embed,
    Sparkles,
    Badge,
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
    Embed,
    Sparkles,
    Badge,
    KeepHtmlPipe,
    RouterModule,
    Yandex,
  ],
})
export class CommonModule {}

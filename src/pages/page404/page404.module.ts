import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommonComponentsModule from '../../common/common.module';
import Page404Page from './page404';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
  ],
  declarations: [
    Page404Page,
  ],
  exports: [ Page404Page ],
})
export default class Page404Module {}

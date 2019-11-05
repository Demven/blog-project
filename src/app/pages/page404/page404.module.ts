import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as CommonComponentsModule } from '../../common/common.module';
import { Page404 } from './page404';
import { PopularArticleComponent } from './popular-article/popular-article';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
  ],
  declarations: [
    Page404,
    PopularArticleComponent
  ],
  exports: [ Page404 ],
})
export class Page404Module {}

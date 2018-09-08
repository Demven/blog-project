import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as CommonComponentsModule } from '../../common/common.module';
import { EditCommonModule } from '../../edit-common/edit-common.module';
import { EditHomePage } from './edit-homepage';
import { EditHomePageSection } from './edit-homepage-section/edit-homepage-section';
import { EditHomePageSectionArticle } from './edit-homepage-section/edit-homepage-section-article/edit-homepage-section-article';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EditCommonModule,
  ],
  declarations: [
    EditHomePage,
    EditHomePageSection,
    EditHomePageSectionArticle,
  ],
  exports: [ EditHomePage ],
})
export class EditHomePageModule {}

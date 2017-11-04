import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommonComponentsModule from '../../common/common.module';
import HomePage from './home';
import HomepageSection from './homepage-section/homepage-section';
import HomepageSectionArticle from './homepage-section/homepage-section-article/homepage-section-article';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
  ],
  declarations: [
    HomePage,
    HomepageSection,
    HomepageSectionArticle,
  ],
  exports: [ HomePage ],
})
export default class HomeModule {}

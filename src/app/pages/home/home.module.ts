import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as CommonComponentsModule } from '../../common/common.module';
import { InViewportModule } from 'ng-in-viewport';
import { HomePage } from './home';
import { HomepageSectionComponent } from './homepage-section/homepage-section';
import { HomepageSectionArticleComponent } from './homepage-section/homepage-section-article/homepage-section-article';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    InViewportModule,
  ],
  declarations: [
    HomePage,
    HomepageSectionComponent,
    HomepageSectionArticleComponent,
  ],
  exports: [ HomePage ],
})
export class HomeModule {}

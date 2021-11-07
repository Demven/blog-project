import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as CommonComponentsModule } from '../../common/common.module';
import { CategoryPage } from './category';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
  ],
  declarations: [
    CategoryPage,
  ],
  exports: [ CategoryPage ],
})
export class CategoryModule {}

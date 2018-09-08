import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutPage } from './logout';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LogoutPage,
  ],
  exports: [ LogoutPage ],
})
export class LogoutModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import Label from './label/label';
import Modal from './modal/modal';

@NgModule({
  imports: [
    RouterModule,
  ],
  declarations: [
    Label,
    Modal,
  ],
  exports: [
    Label,
    Modal,
  ],
})
export default class CommonModule {}

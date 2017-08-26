import { NgModule } from '@angular/core';
import Label from './label/label';
import Modal from './modal/modal';

@NgModule({
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommonComponentsModule from '../../common/common.module';
import ContactsPage from './contacts';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
  ],
  declarations: [
    ContactsPage,
  ],
  exports: [ ContactsPage ],
})
export default class ContactsModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Autosize } from 'ng-autosize';
import EditNav from './edit-nav/edit-nav';
import TextField from './text-field/text-field';
import TextArea from './text-area/text-area';
import SelectField from './select-field/select-field';
import Toast from '../edit-common/toast/toast';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    Autosize,
    EditNav,
    TextField,
    TextArea,
    SelectField,
    Toast,
  ],
  exports: [
    EditNav,
    TextField,
    TextArea,
    SelectField,
    Toast,
  ],
})
export default class EditCommonModule {}

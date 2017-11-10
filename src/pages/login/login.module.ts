import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommonComponentsModule from '../../common/common.module';
import LoginPage from './login';
import EditCommonModule from '../../edit-common/edit-common.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EditCommonModule,
  ],
  declarations: [
    LoginPage,
  ],
  exports: [ LoginPage ],
})
export default class LoginModule {}

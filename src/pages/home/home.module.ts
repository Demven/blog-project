import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import Navbar from '../../common/navbar/navbar';
import HomePage from './home';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    HomePage,
    Navbar,
  ],
  bootstrap: [ HomePage ],
})
export default class HomeModule {}

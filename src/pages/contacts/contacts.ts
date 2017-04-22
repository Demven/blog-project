import { Component, HostBinding } from '@angular/core';
import './contacts.pcss';

@Component({
  selector: 'ds-page-contacts',
  template: `
    <h1>Contacts</h1>
  `,
})
export default class Contacts {
  @HostBinding('class.Contacts') rootClass: boolean = true;
}

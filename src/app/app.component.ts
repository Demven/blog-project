import { Component } from '@angular/core';
import '../../public/styles/main.pcss';
import './app.component.pcss';

@Component({
  selector: 'ds-app',
  template: `
  <main class="AppComponent">
    <h1 class="AppComponent__heading">Hello from Angular App with Webpack</h1>
    <img
      class="AppComponent__image"
      src="../../public/images/angular.png"
    />
  </main>
  `,
})
export class AppComponent {}

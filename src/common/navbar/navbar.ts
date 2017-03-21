import { Component, HostBinding } from '@angular/core';
import './navbar.pcss';

@Component({
  selector: 'ds-navbar',
  template: `
    <nav class="Navbar__menu">
      <menuitem class="Navbar__menu-item">
        <a class="Navbar__menu-link" href="/category/robotics">Robotics</a>
      </menuitem>
      <menuitem class="Navbar__menu-item">
        <a class="Navbar__menu-link" href="/category/thoughts">Thoughts</a>
      </menuitem>
      <menuitem class="Navbar__menu-item">
        <a class="Navbar__menu-link" href="/category/programming">Programming</a>
      </menuitem>
      <menuitem class="Navbar__menu-item">
        <a class="Navbar__menu-link" href="/contacts">Contacs</a>
      </menuitem>
    </nav>
    
    <a
      class="Navbar__logo-container"
      href="/"
    >
      <img
        class="Navbar__logo"
        src="../../../public/images/logo.png"
      />
    </a>
    
    <h3 class="Navbar__blog-name">Dmitry Salnikov</h3>
  `,
})
export default class Navbar {
  @HostBinding('class.Navbar') rootClass: boolean = true;
}

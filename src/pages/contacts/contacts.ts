import { Component, HostBinding } from '@angular/core';
import './contacts.pcss';

@Component({
  selector: 'ds-page-contacts',
  template: `
    <ds-modal>
      <div class="Contacts__modal-content">
        <ds-label [title]="'Contacts'" [blue]="true"></ds-label>

        <img
          class="Contacts__hero-image"
          src="../../../public/images/contacts.jpg"
        />

        <div class="Contacts__info-background"></div>
        <div class="Contacts__info-container">
          <h2 class="Contacts__greeting">Hi, I'm Dmitry Salnikov</h2>

          <p class="Contacts__text">I'm actively interested in web-development, robotics and psychology.</p>
          <p class="Contacts__text">For any reason you can contact with me by email or use socials.</p>

          <div class="Contacts__socials">
            <a
              class="Contacts__social-link"
              href="https://vk.com/demven"
              target="_blank"
            >
              <img
                class="Contacts__social-logo"
                src="../../../public/images/vk.png"
              />
              <span class="Contacts__social-path">/demven</span>
            </a>
            <a
              class="Contacts__social-link"
              href="https://www.facebook.com/dm.salnikov"
              target="_blank"
            >
              <img
                class="Contacts__social-logo"
                src="../../../public/images/facebook.png"
              />
              <span class="Contacts__social-path">/dm.salnikov</span>
            </a>
            <a
              class="Contacts__social-link"
              href="https://github.com/demven"
              target="_blank"
            >
              <img
                class="Contacts__social-logo"
                src="../../../public/images/github.png"
              />
              <span class="Contacts__social-path">/demven</span>
            </a>
          </div>
        </div>
      </div>
    </ds-modal>
  `,
})
export default class Contacts {
  @HostBinding('class.Contacts') rootClass: boolean = true;
}

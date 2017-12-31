import { Component, HostBinding, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
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
          <p class="Contacts__text">For any reason you can contact with me <a class="Contacts__email-link" href="mailto:dmitry_salnikov@protonmail.com" title="dmitry_salnikov@protonmail.com" target="_blank">by email</a> or use socials.</p>

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
export default class Contacts implements OnInit {
  @HostBinding('class.Contacts') rootClass: boolean = true;

  constructor(private metaTags: Meta) {
    this.updateMetaTags = this.updateMetaTags.bind(this);
  }

  ngOnInit() {
    this.updateMetaTags();
  }

  updateMetaTags() {
    this.metaTags.updateTag({ name: 'description', content: 'My contact information' });
    this.metaTags.updateTag({ property: 'og:title', content: 'Contacts - Dmitry Salnikov' });
    this.metaTags.updateTag({ property: 'og:description', content: 'My contact information' });
    this.metaTags.updateTag({ property: 'og:type', content: 'profile' });
    this.metaTags.updateTag({ property: 'og:url', content: `${process.env.WWW_HOST}/contacts` });
    this.metaTags.updateTag({ property: 'og:image', content: `${process.env.WWW_HOST}/public/images/contacts.jpg` });
  }
}

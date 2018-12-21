import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { env } from '../../../environments';

@Component({
  selector: 'ds-page-contacts',
  styleUrls: ['./contacts.scss'],
  template: `
    <ds-modal>
      <div class="Contacts__modal-content">
        <ds-label [title]="'Contacts'" [blue]="true"></ds-label>

        <img
          class="Contacts__hero-image"
          src="/assets/images/contacts.jpg"
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
                src="/assets/images/vk.png"
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
                src="/assets/images/facebook.png"
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
                src="/assets/images/github.png"
              />
              <span class="Contacts__social-path">/demven</span>
            </a>
          </div>
        </div>
      </div>
    </ds-modal>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ContactsPage implements OnInit {
  @HostBinding('class.Contacts') rootClass = true;

  constructor(private metaTags: Meta) {
    this.updateMetaTags = this.updateMetaTags.bind(this);
  }

  ngOnInit() {
    this.updateMetaTags();
  }

  updateMetaTags() {
    const url = `${env.WWW_HOST}/contacts`;
    const title = 'Contacts - Dmitry Salnikov';
    const description = 'My contact information';
    const keywords = 'Dmitry Salnikov, Tech, Science, Programming, Thoughts, JavaScript, CSS, HTML, Blog';
    const imageUrl = `${env.WWW_HOST}/public/images/contacts.jpg`;

    this.metaTags.updateTag({ name: 'description', content: description });
    this.metaTags.updateTag({ name: 'keywords', content: keywords });
    this.metaTags.removeTag('name="author"');

    this.metaTags.updateTag({ property: 'og:title', content: title });
    this.metaTags.updateTag({ property: 'og:description', content: description });
    this.metaTags.updateTag({ property: 'og:type', content: 'profile' });
    this.metaTags.updateTag({ property: 'og:url', content: url });
    this.metaTags.updateTag({ property: 'og:image', content: imageUrl });
    this.metaTags.updateTag({ property: 'og:image:width', content: '960' });
    this.metaTags.updateTag({ property: 'og:image:height', content: '720' });

    this.metaTags.removeTag('property="article:published_time"');
    this.metaTags.removeTag('property="article:author"');
    this.metaTags.removeTag('property="article:section"');
    this.metaTags.removeTag('property="article:tag"');

    this.metaTags.updateTag({ name: 'twitter:title', content: title });
    this.metaTags.updateTag({ name: 'twitter:description', content: description });
    this.metaTags.updateTag({ name: 'twitter:url', content: url });
    this.metaTags.updateTag({ name: 'twitter:image', content: imageUrl });
  }
}

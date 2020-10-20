import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class PageData {
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.set = this.set.bind(this);
  }

  set(data:object) {
    const script:HTMLScriptElement = this.document.createElement('script');
    const pageData = JSON.stringify(data)
      .replace(/<\/(script)/gi, '<\\/$1')
      .replace(/<!--/g, '<\\!--')
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');

    script.innerHTML = `window.pageData = ${pageData}`;

    this.document.head.appendChild(script);
  }
}

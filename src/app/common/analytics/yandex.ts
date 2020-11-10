import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { env } from '../../../environments';

export const EVENT_ID = {
  NAVIGATION_ITEM_CLICKED: 'NAVIGATION_ITEM_CLICKED',
  HOMEPAGE_COMPLETED: 'HOMEPAGE_COMPLETED',
  ARTICLE_CLOSE_BUTTON: 'ARTICLE_CLOSE_BUTTON',
  ARTICLE_NAV_LOGO_CLICK: 'ARTICLE_NAV_LOGO_CLICK',
  ARTICLE_COMPLETED_25: 'ARTICLE_COMPLETED_25',
  ARTICLE_COMPLETED_50: 'ARTICLE_COMPLETED_50',
  ARTICLE_COMPLETED_75: 'ARTICLE_COMPLETED_75',
  ARTICLE_COMPLETED_100: 'ARTICLE_COMPLETED_100',
};

export function sendYandexEvent(eventId:string, params?:object):void {
  if (typeof window !== 'undefined') {
    window['ym'](env.YANDEX_ID, 'reachGoal', eventId, params);
  }
}

@Component({
  selector: 'ds-analytics-yandex',
  template: `
    <!-- Yandex.Metrika -->
    <noscript>
      <div>
        <img
          src="https://mc.yandex.ru/watch/{{YANDEX_ID}}"
          style="position:absolute; left:-9999px;"
        />
      </div>
    </noscript>
    <!-- /Yandex.Metrika -->
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Yandex implements OnInit {
  public YANDEX_METRICA_SRC = 'https://mc.yandex.ru/metrika/tag.js';
  public YANDEX_ID = env.YANDEX_ID;

  constructor() {
    this.load = this.load.bind(this);
    this.initYandex = this.initYandex.bind(this);
  }

  ngOnInit () {
    const runningOnClient = typeof window !== 'undefined';
    if (runningOnClient) {
      const yandexInitialized = window['yandexInitialized'];

      if (!yandexInitialized) {
        this.load().then(this.initYandex);
        window['yandexInitialized'] = true;
      }
    }
  }

  load() {
    window['ym'] = window['ym'] || function () {
      (window['ym'].a = window['ym'].a || []).push(arguments);
    };
    window['ym'].l = +(new Date());

    return new Promise((resolve, reject) => {
      const script = window.document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = this.YANDEX_METRICA_SRC;
      script.onload = resolve;
      script.onerror = reject;

      const firstScript = window.document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    });
  }

  initYandex() {
    window['ym'](this.YANDEX_ID, 'init', {
      id: this.YANDEX_ID,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false // don't use it, the page hangs infinitely
    });
  }
}

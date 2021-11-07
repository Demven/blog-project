import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScreenSize, ScreenSizeService } from '../../services/screen-size.service';

@Component({
  selector: 'ds-embed',
  styleUrls: ['./embed.scss'],
  template: `
    <div
      [ngClass]="['Embed__host', className || '']"
      [innerHTML]="embed | dsKeepHtml"
      #embedHostEl
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Embed implements AfterViewInit {
  @HostBinding('class.Embed') rootClass = true;

  @Input() className: string;
  @Input() embed: string;

  @ViewChild('embedHostEl')
  private embedHostEl: ElementRef;

  constructor(
    private renderer: Renderer2,
    private screenSizeService: ScreenSizeService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loadScriptsInEmbed = this.loadScriptsInEmbed.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.setFacebookIframeHeight = this.setFacebookIframeHeight.bind(this);
    this.setIframeWidth = this.setIframeWidth.bind(this);
  }

  ngAfterViewInit() {
    const runningOnClient = typeof window !== 'undefined';

    if (runningOnClient && this.embed) {
      const isMobile = this.screenSizeService.isCurrentScreenSize(ScreenSize.MOBILE_ANY);

      const isScript = this.embed.includes('<script');
      const isIframe = this.embed.includes('<iframe');

      if (isScript) {
        this.loadScriptsInEmbed();
      }

      if (isMobile && isIframe) {
        const iframe:HTMLIFrameElement = this.embedHostEl.nativeElement.querySelector('iframe');
        const isFacebook = this.embed.includes('facebook.com');

        if (isFacebook) {
          this.setFacebookIframeHeight(iframe);
        }

        this.setIframeWidth(iframe);
      }
    }
  }

  loadScriptsInEmbed() {
    const scripts: Array<HTMLScriptElement> = this.embedHostEl.nativeElement.querySelectorAll('script');

    if (scripts.length > 0) {
      scripts.forEach(this.loadScript);
    }
  }

  setFacebookIframeHeight(iframe:HTMLIFrameElement) {
    const width = iframe.offsetWidth;
    const height = iframe.offsetHeight;
    const ratio = width / height;
    const hostWidth = this.embedHostEl.nativeElement.offsetWidth;

    iframe.style.height = `${Math.round(hostWidth / ratio) + 90}px`;
  }

  setIframeWidth(iframe:HTMLIFrameElement) {
    iframe.style.width = '100%';
  }

  loadScript(scriptNode:HTMLScriptElement) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';

    if (scriptNode.src) { script.src = scriptNode.src; }
    if (scriptNode.text) { script.text = scriptNode.text; }

    this.renderer.appendChild(this.embedHostEl.nativeElement, script);
  }
}

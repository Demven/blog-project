import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
  ViewEncapsulation,
  Renderer2,
  Inject,
  AfterViewInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ds-embed',
  styleUrls: ['./embed.scss'],
  template: `
    <div
      class="Embed__host"
      [innerHTML]="embed | dsKeepHtml"
      #embedHostEl
    ></div>
    <div class="Embed__caption" *ngIf="caption">{{caption}}</div>
    <div class="Embed__credit" *ngIf="credits">{{credits}}</div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Embed implements AfterViewInit {
  @HostBinding('class.Embed') rootClass = true;

  @Input() embedType: string;
  @Input() embed: string;
  @Input() caption: string;
  @Input() credits: string;

  @ViewChild('embedHostEl', { static: false })
  private embedHostEl: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loadScriptsInEmbed = this.loadScriptsInEmbed.bind(this);
    this.loadScript = this.loadScript.bind(this);
  }

  ngAfterViewInit() {
    if (this.embed && this.embed.includes('<script')) {
      this.loadScriptsInEmbed();
    }
  }

  loadScriptsInEmbed() {
    const scripts: Array<HTMLScriptElement> = this.embedHostEl.nativeElement.querySelectorAll('script');

    scripts.forEach(this.loadScript);
  }

  loadScript(scriptNode:HTMLScriptElement) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';

    if (scriptNode.src) { script.src = scriptNode.src; }
    if (scriptNode.text) { script.text = scriptNode.text; }

    this.renderer.appendChild(this.embedHostEl.nativeElement, script);
  }
}

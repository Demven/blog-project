import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'dsKeepHtml', pure: false })
export default class KeepHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text:string):SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}

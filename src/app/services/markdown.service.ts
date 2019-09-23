import { Injectable } from '@angular/core';

class MarkdownFormatter {
  output = '';

  constructor(text:string) {
    this.output = text;
  }

  format():string {
    return this
      .formatSubscript()
      .formatSuperscript()
      .formatLinks()
      .formatLineThrough()
      .formatUnderline()
      .formatBold()
      .formatItalic()
      .formatCode()
      .toString();
  }

  formatSubscript():MarkdownFormatter {
    this.output = this.output.replace(/\^\^(\d+)\^\^/g, '<sub>$1</sub>');
    return this;
  }

  formatSuperscript():MarkdownFormatter {
    this.output = this.output.replace(/\^(\d+)\^/g, '<sup>$1</sup>');
    return this;
  }

  formatLinks():MarkdownFormatter {
    this.output = this.output.replace(/\[([^\]]+)]\(([^(]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    return this;
  }

  formatLineThrough():MarkdownFormatter {
    this.output = this.output.replace(/\~\~([^~]+)\~\~/g, '<span style="text-decoration: line-through">$1</span>');
    return this;
  }

  formatUnderline():MarkdownFormatter {
    this.output = this.output.replace(/\_\_([^_]+)\_\_/g, '<span style="text-decoration: underline">$1</span>');
    return this;
  }

  formatBold():MarkdownFormatter {
    this.output = this.output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return this;
  }

  formatCode():MarkdownFormatter {
    this.output = this.output.replace(/\`([^`]+)\`/g, '<code>$1</code>');
    return this;
  }

  formatItalic():MarkdownFormatter {
    this.output = this.output.replace(/\_([^_]+)\_/g, '<em>$1</em>');
    return this;
  }

  toString():string {
    return this.output;
  }
}

@Injectable()
export class MarkdownService {
  format(text:string = ''):string {
    return new MarkdownFormatter(text).format();
  }
}

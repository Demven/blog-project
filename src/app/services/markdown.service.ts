import { Injectable } from '@angular/core';

function formatSubscript(text:string):string {
  return text.replace(/\^\^(\d+)\^\^/g, '<sub>$1</sub>');
}

function formatSuperscript(text:string):string {
  return text.replace(/\^(\d+)\^/g, '<sup>$1</sup>');
}

function formatLinks(text:string):string {
  return text.replace(/\[([^\]]+)]\(([^(]+)\)/g, '<a href="$2" target="_blank">$1</a>');
}

function formatLineThrough(text:string):string {
  return text.replace(/\~\~([^~]+)\~\~/g, '<span style="text-decoration: line-through">$1</span>');
}

function formatUnderline(text:string):string {
  return text.replace(/\_\_([^_]+)\_\_/g, '<span style="text-decoration: underline">$1</span>');
}

function formatBold(text:string):string {
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function formatItalic(text:string):string {
  return text.replace(/\_([^_]+)\_/g, '<em>$1</em>');
}

@Injectable()
export class MarkdownService {
  format(text:string = ''):string {
    const subscript = formatSubscript(text);
    const superscript = formatSuperscript(subscript);
    const links = formatLinks(superscript);
    const lineThrough = formatLineThrough(links);
    const underline = formatUnderline(lineThrough);
    const bold = formatBold(underline);
    return formatItalic(bold);
  }
}

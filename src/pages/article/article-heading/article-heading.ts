import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import './article-heading.pcss';

export const ARTICLE_HEADING_TYPE = 'heading';

const NON_BREAKING_SPACE = '\u00a0';
const MAX_LENGTH = 10;

class HeadingModel {
  text: string;
}

@Component({
  selector: 'ds-article-heading',
  template: `
    <p class="ArticleHeading__content">{{getTitleWithNonBreakingSpace(content.text)}}</p>
  `,
})
export default class ArticleHeading {
  @HostBinding('class.ArticleHeading') rootClass: boolean = true;

  @Input() content: HeadingModel;

  getTitleWithNonBreakingSpace(title:string):string {
    const lastSpaceIndex:number = title.lastIndexOf(' ');
    const lastWord:string = title.substring(lastSpaceIndex, title.length).replace(' ', '');
    const lastWordWithSpace:string = (lastWord.length < MAX_LENGTH) ? `${NON_BREAKING_SPACE}${lastWord}` : ` ${lastWord}`;

    return `${title.substring(0, lastSpaceIndex)}${lastWordWithSpace}`;
  }
}

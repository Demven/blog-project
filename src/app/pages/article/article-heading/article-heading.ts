import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';

export const ARTICLE_HEADING_TYPE = 'heading';

const NON_BREAKING_SPACE = '\u00a0';
const MAX_LENGTH = 10;

class HeadingModel {
  text: string;
}

@Component({
  selector: 'ds-article-heading',
  styleUrls: ['./article-heading.scss'],
  template: `
    <h3 class="ArticleHeading__content">{{getTitleWithNonBreakingSpace(content.text)}}</h3>
  `,
})
export class ArticleHeading {
  @HostBinding('class.ArticleHeading') rootClass = true;

  @Input() content: HeadingModel;

  getTitleWithNonBreakingSpace(title:string):string {
    const lastSpaceIndex:number = title.lastIndexOf(' ');
    const lastWord:string = title.substring(lastSpaceIndex, title.length).replace(' ', '');
    const lastWordWithSpace:string = (lastWord.length < MAX_LENGTH) ? `${NON_BREAKING_SPACE}${lastWord}` : ` ${lastWord}`;

    return `${title.substring(0, lastSpaceIndex)}${lastWordWithSpace}`;
  }
}

import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import './article-body.pcss';

@Component({
  selector: 'ds-article-body',
  template: `
    <ds-article-body-node
      *ngFor="let node of nodes"
      [content]="node"
    ></ds-article-body-node>
  `,
})
export default class ArticleBody {
  @HostBinding('class.ArticleBody') rootClass: boolean = true;

  @Input() nodes: Array<any>;
}

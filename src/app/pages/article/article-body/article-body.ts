import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-article-body',
  styleUrls: ['./article-body.scss'],
  template: `
    <ds-article-body-node
      *ngFor="let node of nodes"
      [content]="node"
    ></ds-article-body-node>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleBody {
  @HostBinding('class.ArticleBody') rootClass = true;

  @Input() nodes: Array<any>;
}

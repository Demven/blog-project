import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBody {
  @HostBinding('class.ArticleBody') rootClass = true;

  @Input() nodes: Array<any>;
}

import {
  Component,
  Input,
  HostBinding,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { MathJaxService } from '../../../services/mathJax.service';

export const ARTICLE_MATH_TYPE = 'math';

class MathModel {
  equation: string;
}

@Component({
  selector: 'ds-article-math',
  styleUrls: ['./article-math.scss'],
  template: `
    <p
      class="ArticleMath__content"
      id="{{generatedId}}"
    >\`{{content.equation}}\`</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleMath implements OnInit {
  @HostBinding('class.ArticleMath') rootClass = true;

  @Input() content: MathModel;

  public generatedId = `math-${Math.floor(Math.random() * 10000)}`;

  constructor(public mathJaxService:MathJaxService) {}

  ngOnInit() {
    this.mathJaxService.renderEquation(`#${this.generatedId}`);
  }
}

import {
  Component,
  Input,
  HostBinding,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import MathJaxService from '../../../services/mathJax.service';
import './article-math.pcss';

export const ARTICLE_MATH_TYPE = 'math';

class MathModel {
  equation: string;
}

@Component({
  selector: 'ds-article-math',
  template: `
    <p
      class="ArticleMath__content"
      id="{{generatedId}}"
    >\`{{content.equation}}\`</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleMath implements OnInit {
  @HostBinding('class.ArticleMath') rootClass: boolean = true;

  @Input() content: MathModel;

  public generatedId:string = `math-${Math.floor(Math.random()*10000)}`;

  constructor(public mathJaxService:MathJaxService) {}

  ngOnInit() {
    this.mathJaxService.renderEquation(`#${this.generatedId}`);
  }
}

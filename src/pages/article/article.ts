import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import './article.pcss';

@Component({
  selector: 'ds-page-article',
  template: `
    <h1>Article {{slug}}</h1>
  `,
})
export default class Article implements OnInit, OnDestroy {
  @HostBinding('class.Article') rootClass: boolean = true;

  slug: string;
  private routerParamsListener: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routerParamsListener = this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });
  }

  ngOnDestroy() {
    this.routerParamsListener.unsubscribe();
  }
}

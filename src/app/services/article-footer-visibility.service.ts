import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ArticleFooterVisibilityService {
  private articleFooterIsVisible = new BehaviorSubject<boolean>(true);

  setVisibility (value: boolean) {
    this.articleFooterIsVisible.next(value);
  }

  subscribe (callback: Function) {
    this.articleFooterIsVisible.subscribe(<any>callback);
  }
}

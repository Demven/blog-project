import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ArticleTitleVisibilityService {
  private articleTitleIsVisible = new BehaviorSubject<boolean>(true);

  setVisibility (value: boolean) {
    this.articleTitleIsVisible.next(value);
  }

  subscribe (callback: Function) {
    this.articleTitleIsVisible.subscribe(<any>callback);
  }
}

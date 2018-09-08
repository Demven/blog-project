import {
  Component,
  Input,
  Output,
  HostBinding,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-edit-article-body',
  styleUrls: ['./edit-article-body.scss'],
  template: `
    <ds-edit-article-body-node
      *ngFor="let node of nodes; let i = index"
      [index]="i"
      [content]="node"
      (update)="onBodyContentUpdate($event)"
      (remove)="onBodyContentRemove($event)"
      (addContent)="onAddContent($event)"
    ></ds-edit-article-body-node>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleBody {
  @HostBinding('class.EditArticleBody') rootClass = true;

  @Input() nodes: Array<any>;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();
  @Output() addContent: EventEmitter<object> = new EventEmitter();

  onBodyContentUpdate(event: object) {
    this.update.emit(event);
  }

  onBodyContentRemove(event: object) {
    this.remove.emit(event);
  }

  onAddContent(event: object) {
    this.addContent.emit(event);
  }
}

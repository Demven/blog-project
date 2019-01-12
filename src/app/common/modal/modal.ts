import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-modal',
  styleUrls: ['./modal.scss'],
  template: `
    <div class="Modal__content">
      <div class="Modal__top-gradient"></div>
      <a
        class="Modal__close-button"
        [routerLink]="['/']"
        (click)="onClose()"
      ></a>

      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Modal {
  @HostBinding('class.Modal') rootClass = true;
  @HostBinding('class.Modal--flat') @Input() flat: boolean;
  @HostBinding('class.Modal--all-space-on-mobile') @Input() allSpaceOnMobile: boolean;

  @Output() close: EventEmitter<Event> = new EventEmitter();

  constructor() {
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.close.emit();
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import './select-field.pcss';

export class SelectItem {
  text: string;
  value: string;
}

@Component({
  selector: 'ds-select-field',
  template: `
    <div
      class="SelectField"
      [ngClass]="{ 'SelectField--open': open, 'SelectField--with-error': !!errorText }"
    >
      <label
        class="SelectField__label"
        for="{{name}}"
      >
        {{label}}
      </label>
      <div
        class="SelectField__field"
        (click)="openList()"
        (blur)="closeList()"
        [attr.tabindex]="0"
      >
        {{values && values[selectedIndex].text}}
      </div>
      
      <ul class="SelectField__list">
        <li
          class="SelectField__item"
          *ngFor="let itemValue of values; let i = index"
          [attr.data-index]="i"
          (click)="onSelect(+$event.target.dataset.index)"
        >{{itemValue.text}}</li>
      </ul>
      
      <div class="SelectField__error">{{errorText}}</div>
    </div>
  `,
})
export default class SelectField {
  @Input() name: string;
  @Input() label: string;
  @Input() errorText: string;
  @Input() selectedIndex: number;
  @Input() values: Array<SelectItem>;

  @Output() select: EventEmitter<object> = new EventEmitter();

  private open: boolean = false;

  constructor() {
    this.openList = this.openList.bind(this);
    this.closeList = this.closeList.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  openList(): void {
    this.open = true;

    window.document.addEventListener('keyup', this.onKeyUp);
  }

  closeList(): void {
    this.open = false;

    window.document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeList();
    }
  }

  onSelect(selectedIndex: number): void {
    this.select.emit({ name: this.name, selectedIndex });
    this.closeList();
  }
}

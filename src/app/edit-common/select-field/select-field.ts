import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

export class SelectItem {
  text: string;
  value: string;
}

@Component({
  selector: 'ds-select-field',
  styleUrls: ['./select-field.scss'],
  template: `
    <div
      class="SelectField"
      [ngClass]="{ 'SelectField--open': open, 'SelectField--with-error': !!errorText }"
      *ngIf="values && values.length"
    >
      <label
        class="SelectField__label"
        for="{{name}}"
      >
        {{label}}
      </label>
      <div
        class="SelectField__field"
        (click)="openList($event)"
        [attr.tabindex]="0"
      >
        {{values && values.length && values[selectedIndex].text}}
      </div>
      
      <ul class="SelectField__list">
        <li
          class="SelectField__item"
          *ngFor="let itemValue of values; let i = index"
          [attr.data-index]="i"
          (click)="onSelect($event)"
        >{{itemValue.text}}</li>
      </ul>
      
      <div class="SelectField__error">{{errorText}}</div>
    </div>
  `,
})
export class SelectField {
  @Input() name: string;
  @Input() label: string;
  @Input() errorText: string;
  @Input() selectedIndex = 0;
  @Input() values: Array<SelectItem>;

  @Output() select: EventEmitter<object> = new EventEmitter();

  private open = false;

  constructor() {
    this.openList = this.openList.bind(this);
    this.closeList = this.closeList.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onOuterClick = this.onOuterClick.bind(this);
  }

  openList(event: MouseEvent): void {
    event.stopPropagation();

    this.open = true;

    window.document.addEventListener('keyup', this.onKeyUp);
    window.document.addEventListener('click', this.onOuterClick);
  }

  closeList(): void {
    this.open = false;

    window.document.removeEventListener('keyup', this.onKeyUp);
    window.document.removeEventListener('click', this.onOuterClick);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeList();
    }
  }

  onSelect(event:any): void {
    const selectedIndex = event.target.dataset.index;

    this.select.emit({ name: this.name, selectedIndex });
    this.closeList();
  }

  onOuterClick(): void {
    this.closeList();
  }
}

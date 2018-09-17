import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

export class AutoCompleteItem {
  text: string;
  value: string;
}

@Component({
  selector: 'ds-auto-complete',
  styleUrls: ['./auto-complete.scss'],
  template: `
    <label
      class="AutoComplete__label"
      for="{{name}}"
    >
      {{label}}
    </label>
    
    <input
      class="AutoComplete__field"
      id="{{name}}"
      placeholder="{{placeholder}}"
      [attr.required]="required ? 'true' : null"
      (focus)="onFocus($event)"
      (keyup)="onKeyUp($event)"
      (blur)="onBlur($event)"
      value="{{value}}"
    />

    <ul
      class="AutoComplete__list"
      *ngIf="values.length"
    >
      <li
        class="AutoComplete__item"
        *ngFor="let itemValue of values; let i = index"
        [attr.data-index]="i"
        (click)="onSelect($event)"
      >{{itemValue.text}}</li>
    </ul>
    
    <div class="AutoComplete__error">{{errorText}}</div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AutoComplete {
  @HostBinding('class.AutoComplete') rootClass = true;
  @HostBinding('class.AutoComplete--open') open = false;
  @HostBinding('class.AutoComplete--with-error') @Input() errorText: string;

  @Input() name: string;
  @Input() label: string;
  @Input() value: string;
  @Input() values: Array<AutoCompleteItem>;
  @Input() placeholder: string;
  @Input() required: boolean;

  @Output() focus: EventEmitter<Event> = new EventEmitter();
  @Output() change: EventEmitter<object> = new EventEmitter();
  @Output() blur: EventEmitter<Event> = new EventEmitter();
  @Output() select: EventEmitter<object> = new EventEmitter();
  @Output() enter: EventEmitter<object> = new EventEmitter();

  constructor() {
    this.openList = this.openList.bind(this);
    this.closeList = this.closeList.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onOuterClick = this.onOuterClick.bind(this);
  }

  openList(): void {
    this.open = true;

    window.document.addEventListener('keyup', this.onKeyUp);
    window.document.addEventListener('click', this.onOuterClick);
  }

  closeList(): void {
    this.open = false;

    window.document.removeEventListener('keyup', this.onKeyUp);
    window.document.removeEventListener('click', this.onOuterClick);
  }

  onFocus(event: Event) {
    this.focus.emit(event);
  }

  onKeyUp(event: KeyboardEvent) {
    const value = (<HTMLTextAreaElement>event.target).value;

    if (event.key === 'Escape') {
      this.closeList();
      return;
    }

    if (event.key === 'Enter') {
      this.closeList();
      this.enter.emit({ name: this.name, value });
      return;
    }

    if (this.name) {
      if (value.trim()) {
        this.openList();
      } else {
        this.closeList();
      }

      this.change.emit({ name: this.name, value });
    }
  }

  onBlur(event: Event) {
    this.blur.emit(event);
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

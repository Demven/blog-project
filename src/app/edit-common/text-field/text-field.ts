import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ds-text-field',
  styleUrls: ['./text-field.scss'],
  template: `
    <label
      class="TextField__label"
      for="{{name}}"
    >
      {{label}}
    </label>
    <input
      class="TextField__field"
      id="{{name}}"
      [type]="typePassword ? 'password' : 'text'"
      placeholder="{{placeholder}}"
      [attr.required]="required ? 'true' : null"
      (focus)="onFocus($event)"
      (keyup)="onKeyUp($event)"
      (blur)="onBlur($event)"
      value="{{value}}"
    />
    <div class="TextField__error">{{errorText}}</div>
  `,
})
export class TextField {
  @HostBinding('class.TextField') rootClass = true;
  @HostBinding('class.TextField--with-error') @Input() errorText: string;

  @Input() name: string;
  @Input() label: string;
  @Input() value: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() typePassword: boolean;

  @Output() focus: EventEmitter<Event> = new EventEmitter();
  @Output() change: EventEmitter<object> = new EventEmitter();
  @Output() blur: EventEmitter<Event> = new EventEmitter();
  @Output() enterKey: EventEmitter<string> = new EventEmitter();

  onFocus(event: Event) {
    this.focus.emit(event);
  }

  onKeyUp(event: KeyboardEvent) {
    const value = (<HTMLTextAreaElement>event.target).value;

    if (this.name) {
      this.change.emit({ name: this.name, value });
    }

    if (event.key === 'Enter') {
      this.enterKey.emit(this.name);
    }
  }

  onBlur(event: Event) {
    this.blur.emit(event);
  }
}

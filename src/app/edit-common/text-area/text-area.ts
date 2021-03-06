import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-text-area',
  styleUrls: ['./text-area.scss'],
  template: `
    <label
      class="TextArea__label"
      for="{{name}}"
      *ngIf="label"
    >
      {{label}}
    </label>
    <textarea
      class="TextArea__field"
      id="{{name}}"
      placeholder="{{placeholder}}"
      rows="{{rows}}"
      autosize
      [attr.required]="required ? 'true' : null"
      (focus)="onFocus($event)"
      (keyup)="onKeyUp($event)"
      (blur)="onBlur($event)"
    >{{value}}</textarea>
    <div class="TextArea__error">{{errorText}}</div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class TextArea {
  @HostBinding('class.TextArea') rootClass = true;
  @HostBinding('class.TextArea--with-error') @Input() errorText: string;

  @Input() name: string;
  @Input() label: string;
  @Input() rows: number;
  @Input() value: string;
  @Input() placeholder: string;
  @Input() required: boolean;

  @Output() focus: EventEmitter<Event> = new EventEmitter();
  @Output() change: EventEmitter<object> = new EventEmitter();
  @Output() blur: EventEmitter<Event> = new EventEmitter();

  onFocus(event: Event) {
    this.focus.emit(event);
  }

  onKeyUp(event: KeyboardEvent) {
    const value = (<HTMLTextAreaElement>event.target).value;

    if (this.name) {
      this.change.emit({ name: this.name, value });
    }
  }

  onBlur(event: Event) {
    this.blur.emit(event);
  }
}

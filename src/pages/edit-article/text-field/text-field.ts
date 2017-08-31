import { Component, HostBinding, Input } from '@angular/core';
import './text-field.pcss';

@Component({
  selector: 'ds-text-field',
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
      placeholder="{{placeholder}}"
      [attr.required]="required ? 'true' : null"
    />
    <div class="TextField__error">{{errorText}}</div>
  `,
})
export default class TextField {
  @HostBinding('class.TextField') rootClass: boolean = true;
  @HostBinding('class.TextField--with-error') @Input() errorText: string;

  @Input() name: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() required: boolean;
}

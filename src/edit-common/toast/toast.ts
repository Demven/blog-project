import {
  Component,
  HostBinding,
  Input,
  OnInit,
  EventEmitter,
} from '@angular/core';
import './toast.pcss';

@Component({
  selector: 'ds-toast',
  template: `{{message}}`,
})
export default class Toast implements OnInit {
  @HostBinding('class.Toast') rootClass: boolean = true;
  @HostBinding('class.Toast--visible') visible: boolean = false;

  @Input() messageEmmiter: EventEmitter<string>;
  message: string = '';

  private DELAY: number = 3000;

  constructor() {
    this.onMessage = this.onMessage.bind(this);
  }

  ngOnInit() {
    this.messageEmmiter.subscribe((message:string) => this.onMessage(message));
  }

  onMessage(message: string) {
    if (message) {
      this.message = message;
      this.visible = true;

      window.setTimeout(() => {
        this.visible = false;
      }, this.DELAY);
    }
  }
}

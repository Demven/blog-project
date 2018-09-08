import {
  Component,
  HostBinding,
  Input,
  OnInit,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ds-toast',
  styleUrls: ['./toast.scss'],
  template: `{{message}}`,
})
export class Toast implements OnInit {
  @HostBinding('class.Toast') rootClass = true;
  @HostBinding('class.Toast--visible') visible = false;

  @Input() messageEmmiter: EventEmitter<string>;
  message = '';

  private DELAY = 3000;

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

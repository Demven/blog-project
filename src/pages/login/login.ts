import {
  Component,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import UserService from '../../services/user.service';
import './login.pcss';

@Component({
  selector: 'ds-page-login',
  template: `
    <ds-modal>
      <div class="Login__modal-content">
        <ds-label [title]="'Login'" [green]="true"></ds-label>

        <img
          class="Login__hero-image"
          src="../../../public/images/login.jpg"
        />

        <div class="Login__info-background"></div>
        <div class="Login__info-container">
          <h2 class="Login__greeting">Enter the God mode</h2>

          <div class="Login__input-field">
            <ds-text-field
              [name]="'username'"
              [label]="'Name'"
              [placeholder]="'User name'"
              [value]="username"
              [required]="true"
              (change)="onFieldChange($event)"
              (enterKey)="onEnterKey()"
            ></ds-text-field>
          </div>

          <div class="Login__input-field">
            <ds-text-field
              [name]="'password'"
              [label]="'Password'"
              [placeholder]="'Password'"
              [value]="password"
              [required]="true"
              [typePassword]="true"
              (change)="onFieldChange($event)"
              (enterKey)="onEnterKey()"
            ></ds-text-field>
          </div>
        </div>
      </div>

      <ds-toast [messageEmmiter]="toastMessageEmmiter"></ds-toast>
    </ds-modal>
  `,
})
export default class Login {
  @HostBinding('class.Login') rootClass: boolean = true;

  username: string = '';
  password: string = '';
  toastMessageEmmiter: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router, private userService: UserService) {
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onEnterKey = this.onEnterKey.bind(this);
  }

  onFieldChange({ name, value }: { name: string, value: string }) {
    if (name) {
      this[name] = value;
    }
  }

  onEnterKey() {
    this.userService
      .login(this.username, this.password)
      .then(response => {
        if (response.status === 200) {
          this.router.navigate(['/homepage/edit']);
        } else {
          this.toastMessageEmmiter.emit(response.data);
        }
      })
      .catch(error => {
        this.toastMessageEmmiter.emit(error.response.data);
      });
  }
}

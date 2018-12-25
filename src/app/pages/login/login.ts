import {
  Component,
  HostBinding,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ds-page-login',
  styleUrls: ['./login.scss'],
  template: `
    <ds-modal>
      <div class="LoginPage__modal-content">
        <ds-label [title]="'Login'" [green]="true"></ds-label>

        <img
          class="LoginPage__hero-image"
          src="/assets/images/login.jpg"
        />

        <div class="LoginPage__info-background"></div>
        <div class="LoginPage__info-container">
          <h2 class="LoginPage__greeting">Enter the God mode</h2>

          <div class="LoginPage__input-field">
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

          <div class="LoginPage__input-field">
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
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage implements OnInit {
  @HostBinding('class.LoginPage') rootClass = true;

  username = '';
  password = '';
  toastMessageEmmiter: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private userService: UserService,
    private titleTag: Title
  ) {
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onEnterKey = this.onEnterKey.bind(this);
  }

  ngOnInit() {
    this.updatePageTitle();
  }

  updatePageTitle() {
    this.titleTag.setTitle('Enter the God Mode');
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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ds-page-logout',
  template: ``,
  encapsulation: ViewEncapsulation.None,
})
export class LogoutPage implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}

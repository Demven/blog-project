import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import axios from 'axios';
import clientStorage, { STORAGE_KEY } from './clientStorage';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = clientStorage.get(STORAGE_KEY.AUTH_TOKEN);

    return axios
      .post('/api/v1/user/validate', { token })
      .then(response => {
        if (response.status === 200) {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      })
      .catch(() => {
        this.router.navigate(['/login']);
        return false;
      });
  }
}

import { Injectable } from '@angular/core';
import axios from 'axios';
import clientStorage, { STORAGE_KEY } from './client-storage';

@Injectable()
export class UserService {
  private loggedIn = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loggedIn = !!clientStorage.get(STORAGE_KEY.AUTH_TOKEN);
    }
  }

  login(name:string, password:string) {
    return axios
      .post('/api/v1/user/login', { name, password })
      .then(response => {
        if (response.status === 200 && response.data.token) {
          clientStorage.save(STORAGE_KEY.AUTH_TOKEN, response.data.token);
          this.loggedIn = true;
        }

        return response;
      });
  }

  logout() {
    clientStorage.remove(STORAGE_KEY.AUTH_TOKEN);
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

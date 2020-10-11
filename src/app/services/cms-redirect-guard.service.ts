import {Inject, Injectable} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, CanActivate } from '@angular/router';
import { env } from '../../environments';

@Injectable()
export class CMSRedirectGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  canActivate () {
    this.document.location.href = `${env.CMS_HOST}${this.document.location.pathname.replace('/edit', '')}`;
    return false;
  }
}

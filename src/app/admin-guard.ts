import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Api } from './api';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private api: Api, private router: Router) {}

  canActivate(): boolean {
    if (this.api.getToken()) {
      return true;
    } else {
      this.router.navigate(['/landing']);
      return false;
    }
  }
}

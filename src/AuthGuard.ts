import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn') || 'false');
    if (isLoggedIn) {
      return true;
    } else {
      console.warn('Chưa đăng nhập! Chuyển hướng đến trang đăng nhập.');
      this.router.navigate(['/dang-nhap']);
      return false;
    }
  }
}

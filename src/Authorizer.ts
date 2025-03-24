import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './app/services/auth.service';
import { StorageService } from './app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class Authorizer implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(route: any): boolean {
    const user = this.storageService.getUser(); // Lấy thông tin user từ localStorage hoặc API
    const expectedRole = route.data['ADMIN']; // Lấy vai trò yêu cầu từ route

    if (user && user.role.includes(expectedRole)) {
      return true;
    }

    // Nếu không có quyền, chuyển hướng về trang login
    alert("Access denied")
    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  AUTH_PATH: string = 'http://localhost:8080/identity/auth';
  USER_PATH: string = 'http://localhost:8080/identity/users';

  constructor(private http: HttpClient, private storage: StorageService, private router: Router) {
  }

  login(username: string, password: string) {
    this.http.post<LoginResponse>(this.AUTH_PATH + '/token', { username, password }).subscribe({
      next: (response) => {
        console.log(response)
        this.storage.saveToken(response.result.token)
        this.storage.saveUser(username);
        this.router.navigate(['home-page']);
      },
      error: (err) => {
        console.error('Đăng nhập thất bại', err)
      }
    }
    )
  }

  logout(): void {
    this.storage.clean();
    console.log("Logged out successfully!");
  }

  register(
    name: string,
    email: string,
    phone: string,
    role: string,
    address: string,
    username: string,
    password: string,
    gender: string,
    dob: string,
    statusAction: string
  ) {
    console.log(username)
    this.http.post<RegisterResponse>(this.USER_PATH, {
      name,
      email,
      phone,
      role,
      address,
      username,
      password,
      gender,
      dob,
      statusAction
    }).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['dang-nhap']);
      },
      error(err) {
        console.error('Đăng kí thất bại', err);
      },
    })

  }

  forgotPassword(email: any): Observable<any> {
    const url = this.AUTH_PATH + '/forgot-password';
    console.log(url)

    return this.http.post<any>(url, email);
  }

  resetPassword(resetCode: string, newPassword: string, email: string): Observable<any> {
    const url = this.AUTH_PATH + '/reset-password';

    console.log(email);

    const request = {
      email: email,
      resetCode: resetCode,
      newPassword: newPassword
    }

    console.log(request);

    return this.http.post<any>(url, request)
  }

}


interface RegisterResponse {
  code: number;
  idAccount: number;
  name: string;
  email: string;
  phone: string;
  address: string,
  gender: string;
  dob: string;
  role: string;
  username: string;
  password: string;
  verify: number;
  statusAction: string;
  dateAdded: string;
  dateEdited: string;
};



interface LoginResponse {
  code: number;
  result: {
    authenticated: boolean;
    token: string;
  };
}

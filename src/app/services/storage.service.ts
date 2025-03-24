import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { UserService } from './user.service';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private userService: UserService) { }

  user?: User;
  isLoggedIn: boolean = false;

  clean(): void {
    window.localStorage.clear();
    this.isLoggedIn = false; 
  }

  public saveUser(username:string): void {
    this.userService.getUserByUserName(username).subscribe({
      next: (result) => {
        this.user = result.result;

        this.isLoggedIn = true;
        window.localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));

        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(this.user));
      },
      error: (err) => {
        console.error('Get infor that bai!!', err);
      }
    })
  }

  public getUser(): User | undefined {
    const userData = window.localStorage.getItem(USER_KEY);
    if (userData) {
      try {
        return JSON.parse(userData) as User;  // Trả về đối tượng User đã phân tích
      } catch (error) {
        console.error("Failed to parse user data from session storage", error);
      }
    }
    return undefined;
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
}

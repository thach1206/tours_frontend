import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_PATH : string = "http://localhost:8080/identity/users";

  constructor(private http: HttpClient) { }

  getUserByUserName(username:string): Observable<UserResponse>{
    const url = `${this.USER_PATH}/getByUsername?username=${username}`;

    return this.http.get<UserResponse>(url);
  }
}


interface UserResponse {
  code: string;
  result: User;
}
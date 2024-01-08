import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../model/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    login(user: {username:string, password: string}) : Observable<{accessToken: string, token: string}> {
      return this.httpClient.post<{accessToken: string, token: string}>(`${Constant.BASE_URL}${Constant.USERS}${Constant.LOGIN}`,user);
    }
  
  
  }

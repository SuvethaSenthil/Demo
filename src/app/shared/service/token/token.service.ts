import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token =new BehaviorSubject<string>('');

  constructor() { }

  setToken(token: string) {
    this.token.next(token);
    console.log("Token has been updated");
    localStorage.setItem('token',token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}

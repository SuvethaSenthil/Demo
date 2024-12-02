import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token = signal<string>('');

  constructor() { }

  setToken(token: string) {
    this.token.set(token);
  }

  getToken() {
    return this.token();
  }

}

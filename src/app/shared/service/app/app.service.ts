import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { LoginResponse } from '../../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private api_url = 'http://localhost:5000';
  private tokenService = inject(TokenService);

  constructor(private http: HttpClient, ) { }

  register(body: UserData) {
    const url = this.api_url + '/api/auth/register';
    return this.http.post(url, body);
  }

  login(body: LoginData) {
    const url = this.api_url + '/api/auth/login';
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${this.tokenService.getToken()}`,
    // });
    return this.http.post<LoginResponse>(url, body); // this.http.post<LoginResponse>(url,body,{headers});
  }

  /*constructor(private http:HttpClient) { }*/

  
  generatePlan(data: any) {
    const url = "http://localhost:5000/ai/chat";
    console.log(this.tokenService.getToken())
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    return this.http.post(url, data, {headers});
  }
  validateQuiz(data: any) {
    const url = "http://localhost:5000"+"add the quiz API path here"; 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    return this.http.post(url, data, {headers}); 
  }

  generateQuiz(body:any){
    const url = this.api_url+'/study/quiz';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    return this.http.post(url,body, {headers});
  }
}


export interface UserData {
  email: string;
  password: string;
  name: string;
}
export interface LoginData {
  email: string;
  password: string
}

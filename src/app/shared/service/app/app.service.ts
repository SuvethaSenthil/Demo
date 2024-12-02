import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private api_url = 'http://localhost:5000';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  register(body: UserData){
    const url = this.api_url+'/api/auth/register';
    return this.http.post(url,body);
  }

  login(body: LoginData){
    const url = this.api_url+'/api/auth/login';
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${this.tokenService.getToken()}`,
    // });
    return this.http.post/*<LoginResponse>*/(url,body); // this.http.post<LoginResponse>(url,body,{headers});
  }

  /*constructor(private http:HttpClient) { }

  generateplan(data:any){
    const url="http://localhost:5000/ai/chat"
    return this.http.post(url,data);
  }*/
}


export interface UserData {
  email: string;
  password: string;
  name: string;
}
export interface LoginData {
  email:string;
  password:string
}
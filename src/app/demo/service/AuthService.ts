import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from "src/app/config/api.url.config";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post(API_URLS.AUTH_URL + 'login', {
          email,
          password
        }, httpOptions);
    }
    
    registerClient(username: string, email: string, password: string): Observable<any> {
        return this.http.post(API_URLS.AUTH_URL + 'client', {
          username,
          email,
          password
        }, httpOptions);
    }
    registerBanquier(username: string, email: string, password: string): Observable<any> {
      return this.http.post(API_URLS.AUTH_URL + 'banquier', {
        username,
        email,
        password
      }, httpOptions);
  }
}
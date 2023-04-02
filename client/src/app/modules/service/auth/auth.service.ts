import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload, LoginResponce } from 'src/app/pages/auth/login/interface/login.interface';
import { RegistrationPayload, RegistrationResponce } from 'src/app/pages/auth/registration/interface/registration.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getToken(): string  {
    return localStorage.getItem('blog-token') as string;
  }

  constructor(private http:HttpClient) {}

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  public login(payload:LoginPayload):Observable<LoginResponce> {
    return this.http.post<LoginResponce>(`/auth/login`, payload)
  }
  public registration(payload:RegistrationPayload):Observable<RegistrationResponce> {
    return this.http.post<RegistrationResponce>(`/auth/registration`, payload)
  }
}

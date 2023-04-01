import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  constructor(
    private http:HttpClient) { }

  public getUserById(id:string):Observable<any> {
    return this._getUserById(id);
  }
  public getAllUsers():Observable<any> {
    return this._getAllUsers();
  }
  private _getUserById(id:string):Observable<any> {
    return this.http.get(`/user/${id}`)
  }
  private _getAllUsers():Observable<any> {
    return this.http.get(`/users`)
  }
}

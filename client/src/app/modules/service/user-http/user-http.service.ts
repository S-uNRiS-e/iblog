import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserParseService } from '../user-parse/user-parse.service';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private userParseService = inject(UserParseService)
  constructor(private http: HttpClient) { }
  public uploadAvatar(formData: FormData): Observable<any> {
    return this._uploadAvatar(formData)
      .pipe(map(responce => {
        return this.userParseService.parseUserInfo(responce)
      }))
  }
  public getUserInfo(): Observable<any> {
    return this._getUserInfo()
      .pipe(map(({user}) => {
        return this.userParseService.parseUserInfo(user)
      }))
  }
  public logout():Observable<any> {
    return this.http.get('/logout')
  }
  private _uploadAvatar(formData: FormData): Observable<any> {
    return this.http.post(`/upload-avatar`, formData)
  }
  private _getUserInfo(): Observable<any> {
    return this.http.get(`/user-info`)
  }
}

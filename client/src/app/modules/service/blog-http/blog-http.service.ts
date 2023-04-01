import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {
  constructor(private _http:HttpClient) { }
  public createPost(formData:FormData):Observable<any> {
    return this._createPost(formData) 
  }

  private _createPost(formData:FormData):Observable<any> {
    return this._http.post(`/create`,formData)
  }
}

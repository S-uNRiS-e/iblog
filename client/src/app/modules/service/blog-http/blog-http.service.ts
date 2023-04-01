import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { BlogParseService } from '../blog-parse/blog-parse.service';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {
  constructor(
    private http:HttpClient,
    private blogParseService:BlogParseService
  ) { }
  public createPost(formData:FormData):Observable<any> {
    return this._createPost(formData) 
  }
  public getAllPosts():Observable<any> {
    return this._getAllPosts()
  }
  private _getAllPosts():Observable<any> {
    return this.http.get(`/posts`)
      .pipe(
        map(response => {
          const parseData = this.blogParseService.parsePostData(response)
          return {
            posts:parseData,
            recommendPost:parseData[0]
          }
        })
      )
  }
  private _createPost(formData:FormData):Observable<any> {
    return this.http.post(`/create`,formData)
  }

}

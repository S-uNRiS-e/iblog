import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { BlogParseService } from '../blog-parse/blog-parse.service';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {
  public posts$:BehaviorSubject<any> = new BehaviorSubject({posts:null,recommendPost:null})
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
  public getPostById(id:string):Observable<any> {
    return this._getPostById(id)
  }
  private _getPostById(id:string):Observable<any> {
    return this.http.get(`/post/${id}`)
  }
  private _getAllPosts():Observable<any> {
    return this.http.get(`/posts`)
      .pipe(
        map(response => {
          const parseData = this.blogParseService.parsePostData(response)
          const data = {
            posts:parseData,
            recommendPost:parseData[0]
          }
          this.posts$.next(data)
        })
      )
  }
  private _createPost(formData:FormData):Observable<any> {
    return this.http.post(`/create`,formData)
  }

}

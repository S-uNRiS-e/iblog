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
  public searchNews(payload:{name:string}):Observable<any> {
  return this._searchNews(payload)
    .pipe(
      map(responce => {
        return  this.blogParseService.parsePostData(responce)
      })
    )
  }
  public getPostById(id:string):Observable<any> {
    return this._getPostById(id)
  }
  public like(newsId:Object):Observable<any> {
    return this._like(newsId)
  }
  private _like(payload:Object):Observable<any> {
    return this.http.post(`/favorites`, payload)
  }
  private _searchNews(payload:{name:string}):Observable<any> {
    return this.http.post(`/search`, {payload})
  }
  private _getPostById(id:string):Observable<any> {
    return this.http.get(`/post/${id}`)
  }
  private _getAllPosts():Observable<any> {
    return this.http.get(`/posts`)
      .pipe(
        map(responce => {
          const parseData = this.blogParseService.parsePostData(responce)
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { BlogParseService } from '../blog-parse/blog-parse.service';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {
  public posts$: ReplaySubject<any> = new ReplaySubject()
  constructor(
    private http: HttpClient,
    private blogParseService: BlogParseService
  ) { }
  public createPost(formData: FormData): Observable<any> {
    return this._createPost(formData)
  }
  public getAllPosts(): Observable<any> {
    return this._getAllPosts()
  }
  public searchNews(payload: { name: string }): Observable<any> {
    return this._searchNews(payload)
      .pipe(
        map(responce => {
          return this.blogParseService.parsePostData(responce)
        })
      )
  }
  public getPostById(id: string): Observable<any> {
    return this._getPostById(id)

  }
  public getUserPosts(): Observable<any> {
    return this._getUserPosts()
      .pipe(
        map(responce => {
          return this.blogParseService.parsePostData(responce)
        })
      )
  }
  public like(newsId: Object): Observable<any> {
    return this._like(newsId)
  }
  public dislike(newsId: Object): Observable<any> {
    return this._dislike(newsId)
  }
  private _like(payload: Object): Observable<any> {
    return this.http.post(`/favorites`, payload)
  }

  public getAllFavorites(): Observable<any> {
    return this._getAllFavorites()
      .pipe(
        map(responce => {
          const { favorites } = responce;
          let parseData = favorites.map((f: any) => {
            return {
              favId: f._id,
              postId: f.newsId,
              userId: f.userId,
              post: this.blogParseService.parsePostData([...f.post])
            }
          })
          const posts = parseData.reduce((acc: any, item: any) => {
            acc.push({ ...item.post })
            return acc
          }, []).map((p: any) => {
            for (const [key, value] of Object.entries(p)) {
              return value
            }
          })
          return { posts }
        })
      )
  }
  private _dislike(payload: Object): Observable<any> {
    return this.http.post(`/dislike`, payload)
  }
  private _searchNews(payload: { name: string }): Observable<any> {
    return this.http.post(`/search`, { payload })
  }
  private _getPostById(id: string): Observable<any> {
    return this.http.get(`/post/${id}`)
  }
  private _getAllFavorites(): Observable<any> {
    return this.http.get(`/favorites`)
  }
  private _getUserPosts(): Observable<any> {
    return this.http.get(`/user-posts`)
  }
  private _getAllPosts(): Observable<any> {
    return this.http.get(`/posts`)
      .pipe(
        map(responce => {
          const parseData = this.blogParseService.parsePostData(responce)
          const data = {
            posts: parseData,
            recommendPost: parseData[0]
          }
          this.posts$.next(data)
        })
      )
  }
  private _createPost(formData: FormData): Observable<any> {
    return this.http.post(`/create`, formData)
  }

}

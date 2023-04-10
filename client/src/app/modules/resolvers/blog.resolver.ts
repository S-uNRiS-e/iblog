import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogHttpService } from '../service/blog-http/blog-http.service';
import { BlogParseService } from '../service/blog-parse/blog-parse.service';

@Injectable({
  providedIn: 'root'
})
export class BlogResolver implements Resolve<Observable<string>> {
  private blogHttpService = inject(BlogHttpService)
  private blogParseService = inject(BlogParseService)
 

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.blogHttpService
      .getPostById(route.paramMap.get('id') as string)
      .pipe(
        map(news => {
          return this.blogParseService.parsePostData(news.data,news.fav)[0]
        })
      )
  }
}
import { AuthService } from './modules/service/auth/auth.service';
import { Component, OnDestroy, inject } from '@angular/core';
import { delay, map, Observable, of, Subscription } from 'rxjs';
import { BlogHttpService } from './modules/service/blog-http/blog-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  private subscribtions$: Subscription = new Subscription();

  public authService = inject(AuthService)
  public blogHttpService = inject(BlogHttpService)
  
  constructor() {}
  public updateFeed(status: boolean): void {
    if (status) {
      this.subscribtions$.add(
        this.blogHttpService.getAllPosts().subscribe()
      )
    }
  }
  ngOnDestroy(): void {
    this.subscribtions$ && this.subscribtions$.unsubscribe()
  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogHttpService } from 'src/app/modules/service/blog-http/blog-http.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private blogHttpService = inject(BlogHttpService)
  private subscriptions$ = new Subscription()

  public posts = []
  ngOnInit(): void {
    this.init()
  }
  private init(): void {
    this.subscriptions$.add(
      this.blogHttpService.getAllFavorites().subscribe({
        next: (responce: any) => {
          const {posts} = responce
          this.posts = posts
        },
        error: (err: any) => {

        },
        complete: () => {

        }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscriptions$ && this.subscriptions$.unsubscribe()
  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { BlogHttpService } from 'src/app/modules/service/blog-http/blog-http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
  public recommendPost:any = {};
  public posts:any = [];
  public isLoading = true;
  private subscriptions$ = new Subscription();
  private blogHttpService = inject(BlogHttpService)
  constructor() {
    this.blogHttpService.getAllPosts().subscribe()
  };

  ngOnInit(): void {
    this.getAllPosts()
  }

  public updateFeed(status:boolean):void {
    if (status) {
      this.getAllPosts()
    }
  }

  private getAllPosts():void {
    this.subscriptions$.add(
      this.blogHttpService.posts$.pipe(take(1)).subscribe((responce:any) => {
        const {posts,recommendPost} = responce;
        if (posts && recommendPost) {
          this.posts = posts;
          console.log('main',posts);
          
          this.recommendPost = recommendPost;
          this.isLoading = false;
        }
      })
    ) 
  }
  ngOnDestroy(): void {
      this.subscriptions$ && this.subscriptions$.unsubscribe()
  }
}

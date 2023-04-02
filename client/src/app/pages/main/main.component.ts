import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private subscriptions$ = new Subscription()
  constructor(private blogHttpService:BlogHttpService) {
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
      this.blogHttpService.posts$.subscribe((responce:any) => {
        const {posts,recommendPost} = responce;
        if (posts && recommendPost) {
          this.posts = posts;
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

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
  private subscriptions$ = new Subscription()
  constructor(private blogHttpService:BlogHttpService) {}
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
      this.blogHttpService.getAllPosts().subscribe(responce => {
        const {posts,recommendPost} = responce
  
        this.posts = posts
        this.recommendPost = recommendPost
      })
    ) 
  }
  ngOnDestroy(): void {
      this.subscriptions$ && this.subscriptions$.unsubscribe()
  }
}

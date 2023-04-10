import { BlogHttpService } from 'src/app/modules/service/blog-http/blog-http.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  //inject 
  private activatedRoute = inject(ActivatedRoute)
  private blogHttpService = inject(BlogHttpService)
  //common news
  public isLoading = true;
  public news:any  = null;
  //common obs
  private subscriptions$:Subscription =new Subscription()

  ngOnInit(): void {
    this.init()
  }

  private init() {
    const {news} = this.activatedRoute.snapshot.data;
    this.news = news

    this.isLoading = false;
  }
  public onAction(action:boolean):void {
    if (action) {
      this.subscriptions$.add(
        this.blogHttpService
          .like({newsId:this.news.postId})
          .subscribe(result => {},err => {})
      )
    }
  }
  public parseUserName(userName:string):string {
    return userName.charAt(0);
  }

  ngOnDestroy(): void {
      this.subscriptions$ && this.subscriptions$.unsubscribe()
  }
  
}

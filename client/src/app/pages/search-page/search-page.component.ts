import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogHttpService } from 'src/app/modules/service/blog-http/blog-http.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnDestroy {
  private blogHttpService = inject(BlogHttpService)
  private subscriptions$:Subscription =new Subscription()

  public onSearchNews(event:boolean):void {
    this.subscriptions$.add(
      // this.blogHttpService
    )
  }
  ngOnDestroy(): void {
      this.subscriptions$ && this.subscriptions$.unsubscribe()
  }
}


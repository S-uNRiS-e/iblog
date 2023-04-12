import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogHttpService } from 'src/app/modules/service/blog-http/blog-http.service';
import { ToastrService } from 'src/app/modules/service/toastr/toastr.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnDestroy {
  private blogHttpService = inject(BlogHttpService)
  private toastrService = inject(ToastrService)
  private subscriptions$:Subscription =new Subscription()

  public posts = [];
  public isShowLoading = false;
  public onSearchNews(event:string):void {
    const params = {
      name:event
    }
    this.isShowLoading = true;
    this.subscriptions$.add(
      this.blogHttpService
        .searchNews(params)
        .subscribe(posts => {
          this.posts = posts;
          this.isShowLoading = false;
        },
        err => {
          this.isShowLoading = false;
          this.toastrService.showError(err.error.message);
        })
    )
  }
  ngOnDestroy(): void {
      this.subscriptions$ && this.subscriptions$.unsubscribe()
  }
}


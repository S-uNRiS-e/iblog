import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-banner',
  templateUrl: './news-banner.component.html',
  styleUrls: ['./news-banner.component.scss']
})
export class NewsBannerComponent {

  @Input() news: any = {};
  @Input() isLoading = true;
  private router = inject(Router)

  public parseUserName(userName: string): string {
    return userName.charAt(0);
  }
  public onBannerClick(id: string) {
    this.router.navigate([`/news-detail/${id}`])
  }
}

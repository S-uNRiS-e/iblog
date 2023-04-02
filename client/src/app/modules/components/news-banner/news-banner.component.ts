import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-banner',
  templateUrl: './news-banner.component.html',
  styleUrls: ['./news-banner.component.scss']
})
export class NewsBannerComponent {
  @Input() news:any = {};
  @Input() isLoading = true;

  public parseUserName(userName:string):string {
    return userName.charAt(0);
  }
}

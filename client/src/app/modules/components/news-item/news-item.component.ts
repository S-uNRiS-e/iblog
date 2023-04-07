import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  @Input() news: any;
  private router = inject(Router)
  public onItemClick(id:string):void {
    this.router.navigate([`/news-detail/${id}`])
  }
}


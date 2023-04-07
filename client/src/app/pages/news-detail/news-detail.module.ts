import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsDetailRoutingModule } from './news-detail-routing.module';
import { NewsDetailComponent } from './news-detail.component';
import { SharedModule } from 'src/app/modules/shared.module';


@NgModule({
  declarations: [
    NewsDetailComponent
  ],
  imports: [
    CommonModule,
    NewsDetailRoutingModule,
    SharedModule
  ]
})
export class NewsDetailModule { }

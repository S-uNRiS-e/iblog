import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { SharedModule } from 'src/app/modules/shared.module';


@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    SharedModule,
    SearchPageRoutingModule,
  ]
})
export class SearchPageModule { }

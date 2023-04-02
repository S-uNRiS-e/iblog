import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { WigEditorComponent } from './components/wig-editor/wig-editor.component';
import {NgxWigModule} from 'ngx-wig';
import { NewsBannerComponent } from './components/news-banner/news-banner.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

const COMPONENTS = [
    NavMenuComponent, 
    HeaderComponent,
    CreatePostComponent,
    FileUploadComponent,
    WigEditorComponent,
    NewsBannerComponent,
    NewsItemComponent,
    SkeletonComponent
]
const MODULES = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWigModule,
    NgxSkeletonLoaderModule
]
@NgModule({
    imports:[...MODULES],
    declarations:[...COMPONENTS],
    exports:[
        ...COMPONENTS,
        ...MODULES
    ]
})
export class SharedModule {}
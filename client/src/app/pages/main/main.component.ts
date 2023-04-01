import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from 'src/app/modules/service/blog-http/blog-http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  public recommendPost:any = {};
  public posts:any = []
  constructor(private blogHttpService:BlogHttpService) {}
  ngOnInit(): void {
    this.blogHttpService.getAllPosts().subscribe(responce => {
      const {posts,recommendPost} = responce
      
      this.posts = posts
      this.recommendPost = recommendPost
    })
  }
}

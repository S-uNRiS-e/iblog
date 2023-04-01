import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BlogParseService {
  constructor() { }

  private get ImageApiUrl():string {
    return 'http://localhost:5500/'
  }

  public parsePostData(data:any):Array<any> {
    return data.map((post:any) => {
      return {
        name:post.postName,
        description:post.postDescription,
        banner:`${this.ImageApiUrl}${post.imageSrc}`,
        userId:post.userId,
        postId:post._id,
        userName:post.author.username,
        createdDate:post.createDate
      }
    })
  }
}

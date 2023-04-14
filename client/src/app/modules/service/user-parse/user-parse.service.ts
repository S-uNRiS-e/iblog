import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserParseService {
  private get ImageApiUrl():string {
    return 'http://localhost:5500/'
  }
  constructor() { }
  public parseUserInfo(userInfo: any):any {
    return {
      avatar:`${this.ImageApiUrl}${userInfo.avatar}`,
      username:userInfo.username
    }
  }
}

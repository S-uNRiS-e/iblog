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
      avatar:userInfo.avatar ? `${this.ImageApiUrl}${userInfo.avatar}` : null,
      username:userInfo.username
    }
  }
}

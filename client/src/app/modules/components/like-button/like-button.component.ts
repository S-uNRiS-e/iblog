import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {
  @Input() public isLike = false;
  @Output() likeCallback = new EventEmitter<boolean>()
  public onLike() {
    this.likeCallback.emit(true);
    this.isLike = true;
  }
  public onUnLike() {
    this.likeCallback.emit(false);
    this.isLike = false;
  }
}

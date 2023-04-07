import { Component, Input } from '@angular/core';

@Component({
  selector: 'like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {
  @Input() public isLike = false;

  public onLike() {
    this.isLike = true;
  }
  public onUnLike() {
    this.isLike = false;
  }
}

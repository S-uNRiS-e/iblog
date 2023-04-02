import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() count:string = '1'
  @Input() type:"circle" | "line" = 'line'
  @Input() animation:string = 'progress'
  @Input() bgColor:string = '#F5F5F8'
  @Input() height:string = 'auto'
  @Input() bRadius:number = 0
}

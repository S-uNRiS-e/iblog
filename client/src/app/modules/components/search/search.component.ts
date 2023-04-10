import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() emitSearchEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}
  ngOnInit(): void {
      
  }
  public handleDebouncedKeyUp(event:any):void {
    console.log(event.target.value);
  }
}

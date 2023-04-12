import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() emitSearchEvent: EventEmitter<string> = new EventEmitter<string>();
  private value = ''
  constructor() {}
  ngOnInit(): void {
      
  }
  public handleDebouncedKeyUp(event:any):void {
    this.emitSearchEvent.emit(event.target.value);
  }
  public onSearch() {
    this.emitSearchEvent.emit(this.value); 
  }
  public onChange(event:any) {
    this.value = event.value;
  }
}

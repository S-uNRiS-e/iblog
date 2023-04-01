import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wig-editor',
  templateUrl: './wig-editor.component.html',
  styleUrls: ['./wig-editor.component.scss'],
  
})
export class WigEditorComponent implements OnChanges {
  @Input() public inputFormControl: FormControl = new FormControl();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {

  }
}

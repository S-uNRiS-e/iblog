import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogService, DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostComponent {
  ref: DialogRef<any> = inject(DialogRef);
  createForm:FormGroup = new FormGroup({
    postName:new FormControl('', Validators.required),
    postDescription:new FormControl('Enter your mind here...', Validators.required),
    postFile:new FormControl(File, Validators.required),
  })
  public onFileSelect(file:File):void {
    console.log(file);
    
  }
  public getControl(controlName:string):FormControl {
    return this.createForm.get(controlName) as FormControl;
  }
}

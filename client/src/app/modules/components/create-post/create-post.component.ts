import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogService, DialogRef } from '@ngneat/dialog';
import { BlogHttpService } from '../../service/blog-http/blog-http.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostComponent {
  constructor(private blogHttpService:BlogHttpService) {}
  ref: DialogRef<any> = inject(DialogRef);
  createForm:FormGroup = new FormGroup({
    postName:new FormControl('', Validators.required),
    postDescription:new FormControl('', Validators.required),
    postFile:new FormControl(null, Validators.required),
  })
  public isShowErrors = false

  public onFileSelect(file:File):void {
    this.getControl('postFile').patchValue(file);    
  }
  public onSubmit():void {
    this.isShowErrors = true;
    
    if(this.createForm.valid) {
      const formData = new FormData();
      formData.append('postName', this.getControl('postName').value)
      formData.append('postDescription', this.getControl('postDescription').value)
      formData.append('files', this.getControl('postFile').value)
     
      this.blogHttpService.createPost(formData)
        .subscribe(
          result => {

        },
        err => {
          // debugger
        })
    }
  }
  public getControl(controlName:string):FormControl {
    return this.createForm.get(controlName) as FormControl;
  }
}

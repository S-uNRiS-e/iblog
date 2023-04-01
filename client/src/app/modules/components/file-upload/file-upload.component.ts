import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {
    fileName = '';
    @Output() fileCallback = new EventEmitter()
    constructor() {}

    onFileSelected(event:any) {
        const file:File = event.target.files[0];
        this.fileCallback.emit(file)
        if (file) {
            this.fileName = file.name;
        }
    }
}
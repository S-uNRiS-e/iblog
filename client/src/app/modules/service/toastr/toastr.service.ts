import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toast: HotToastService) { }

  public showError(message: string, options:any = {}) {
    this.toast.error(message,options);
  }
}

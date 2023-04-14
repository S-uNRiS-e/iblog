import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogHttpService } from 'src/app/modules/service/blog-http/blog-http.service';
import { ToastrService } from 'src/app/modules/service/toastr/toastr.service';
import { UserHttpService } from 'src/app/modules/service/user-http/user-http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userHttpService = inject(UserHttpService);
  private blogHttpService = inject(BlogHttpService);
  private toastrService = inject(ToastrService)
  private subscriptions$ = new Subscription();

  public userInfo: { username: string, avatar: string } | any = {}
  public posts: any = []
  ngOnInit(): void {
    this.init()
  }

  private init(): void {
    this.subscriptions$.add(
      this.userHttpService.getUserInfo().subscribe({
        next: (responce) => {
          this.userInfo = responce
        },
        error: (err) => {
          this.toastrService.showError(err.error.message)
        }
      })

    )
    this.subscriptions$.add(
      this.blogHttpService.getUserPosts().subscribe({
        next: (responce) => {
          debugger
        },
        error: (err) => {
          this.toastrService.showError(err.error.message)
        }
      })
    )
  }
  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const fd = new FormData();
    fd.append('avatar', file)
    this.subscriptions$.add(
      this.userHttpService.uploadAvatar(fd).subscribe({
        next: (responce) => {
          this.userInfo = responce
        },
        error: (err) => {
          this.toastrService.showError(err.error.message)
        }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscriptions$ && this.subscriptions$.unsubscribe()
  }
}

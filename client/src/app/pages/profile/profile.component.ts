import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { Subscription } from 'rxjs';
import { CreatePostComponent } from 'src/app/modules/components/create-post/create-post.component';
import { BlogHttpService } from 'src/app/modules/service/blog-http/blog-http.service';
import { ToastrService } from 'src/app/modules/service/toastr/toastr.service';
import { UserHttpService } from 'src/app/modules/service/user-http/user-http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private dialog = inject(DialogService);
  private userHttpService = inject(UserHttpService);
  private blogHttpService = inject(BlogHttpService);
  private toastrService = inject(ToastrService)
  private router = inject(Router)
  private subscriptions$ = new Subscription();

  public loading: boolean = true;
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
    this.getUserPosts()

  }
  private getUserPosts() {
    this.subscriptions$.add(
      this.blogHttpService.getUserPosts().subscribe({
        next: (responce) => {
          this.posts = responce
          this.loading = false
        },
        error: (err) => {
          this.toastrService.showError(err.error.message)
        }
      })
    )
  }

  public create() {
    const dialogRef = this.dialog.open(CreatePostComponent);
    dialogRef.afterClosed$.subscribe(status => {
      if (status) {
        this.getUserPosts()
      }
    })
  }
  
  public logout() {
    this.subscriptions$.add(
      this.userHttpService.logout().subscribe({
        next: (value) => {
          localStorage.removeItem('blog-token');
          this.router.navigate(['/welcome']);
          this.toastrService.showSuccess(value.message);
        },
        error: (err) => {
          this.toastrService.showSuccess(err.error.message);
        }
      })
    )
  }
  public openNews(post: any) {
    this.router.navigate([`/news-detail/${post.postId}`])
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

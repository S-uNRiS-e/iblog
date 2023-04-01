import { Component, inject, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { NavigateMenu } from './nav-menu.mock';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  public menu = NavigateMenu;
  private dialog = inject(DialogService);
  ngOnInit(): void {
    
  }
  public onNavigateLink(){
    const dialogRef = this.dialog.open(CreatePostComponent);
  }
}

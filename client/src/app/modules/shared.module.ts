import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoaderComponent } from './components/loader/loader.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [
    LoaderComponent, 
    NavMenuComponent, 
    UsersListComponent, 
    HeaderComponent
]
const MODULES = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
]
@NgModule({
    imports:[...MODULES],
    declarations:[...COMPONENTS],
    exports:[
        ...COMPONENTS,
        ...MODULES
    ]
})
export class SharedModule {}
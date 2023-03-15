import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
    imports:[CommonModule,RouterModule],
    declarations:[LoaderComponent],
    exports:[LoaderComponent]
})
export class SharedModule {}
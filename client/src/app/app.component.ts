import { Component } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoading$: Observable<boolean> = of(false).pipe(delay(1500), map(st => !st));
}

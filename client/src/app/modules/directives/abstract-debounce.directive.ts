import {
    Directive,
    OnDestroy,
    Input,
    Output,
    EventEmitter
  } from "@angular/core";
  import { Subject } from "rxjs";
  import {
    takeUntil,
    debounceTime,
    distinctUntilChanged,
    tap
  } from "rxjs/operators";
  
  @Directive()
  export abstract class AbstractDebounceDirective implements OnDestroy {
    @Input()
    public debounceTime: number = 500;
  
    @Output()
    public onEvent: EventEmitter<any> = new EventEmitter<any>();
  
    protected emitEvent$: Subject<any> = new Subject<any>();
    protected subscription$: Subject<void> = new Subject<void>();
  
    constructor() {}
  
    ngOnInit(): void {
      this.emitEvent$
        .pipe(
          takeUntil(this.subscription$),
          debounceTime(this.debounceTime),
          distinctUntilChanged(),
          tap(value => this.emitChange(value))
        )
        .subscribe();
    }
  
    public emitChange(value: any): void {
      this.onEvent.emit(value);
    }
  
    ngOnDestroy(): void {
      this.subscription$.next();
      this.subscription$.complete();
    }
  }
  
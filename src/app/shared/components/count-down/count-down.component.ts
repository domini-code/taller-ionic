import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimerService } from '@core/services/timer.service';
import { interval, merge, Observable, of, Subject } from 'rxjs';
import { mapTo, scan, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CountDownComponent implements OnInit, AfterViewInit  {
  @Input() timeInSec: number;
  @Input() start: Observable<void>;
  @Input() pause: Observable<void>;
  @Input() reset: Observable<void>;
  @Output() time = new EventEmitter<number>();

  clock$: Observable<number>;

  constructor(
    private clockService: TimerService
  ) { }

  shareCurrentTime(time: number) {
    this.time.emit(time);
  }

  ngOnInit() {
    this.clockService.updateState(+this.timeInSec, 'seconds');
  }

  ngAfterViewInit() {
    const start$ = this.start.pipe(mapTo(true));
    const pause$ = this.pause.pipe(mapTo(false));
    const reset$ = this.reset.pipe(mapTo(null));
    const zero$ = new Subject();
    const stateChange$ = this.clockService.action$.pipe(mapTo(null));

    this.clock$ = merge(
      start$,
      pause$,
      reset$,
      zero$,
      stateChange$,
    ).pipe(
        switchMap((isCounting: number) => {
          if (isCounting === null) return of(null);
          return isCounting ? interval(1000) : of();
        }),
        scan((accummulated: number, current: number) => {
          if (accummulated === 0 && current !== null) {  
            zero$.next(null);
            return accummulated;
          }
          if (current === null || !accummulated)
            return this.clockService.getTotalSeconds();
          return --accummulated;
        }),
        tap(num => {
          if (num !== 0 || num !== null) {
            this.shareCurrentTime(num);
          }
        })
      );
  }
}

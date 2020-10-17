import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, merge, Observable, of, Subject } from 'rxjs';
import { mapTo, scan, switchMap, tap } from 'rxjs/operators';
import { CountDownService } from './count-down.service';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, AfterViewInit  {
  @Input() timeInSec: number;
  @Output() time = new EventEmitter<number>();
  // TODO: Share when reach zero!
  clock$: Observable<number>;

  constructor(
    private countDownSrv: CountDownService
  ) { }

  shareCurrentTime(time: number) {
    this.time.emit(time);
  }

  ngOnInit() {
    this.countDownSrv.updateState(+this.timeInSec, 'seconds');
  }

  ngAfterViewInit() {
    const start$ = this.countDownSrv.startAction$.pipe(mapTo(true));
    const pause$ = this.countDownSrv.pauseAction$.pipe(mapTo(false));
    const reset$ = this.countDownSrv.resetAction$.pipe(mapTo(null));
    const zero$ = new Subject();
    const stateChange$ = this.countDownSrv.timerAction$.pipe(mapTo(null));

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
            return this.countDownSrv.getTotalSeconds();
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

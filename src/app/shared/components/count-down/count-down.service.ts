import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface ICountDown {
  seconds: number;
  minutes: number;
  hours: number;
  totalTime: number; // mm
}

@Injectable()
export class CountDownService {

  private timerState = new BehaviorSubject<ICountDown>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    totalTime: 0,
  });
  private start: Subject<void> = new Subject();
  private pause: Subject<void> = new Subject();
  private reset: Subject<void> = new Subject();

  timerAction$ = this.timerState.asObservable();
  startAction$ = this.start.asObservable();
  pauseAction$ = this.pause.asObservable();
  resetAction$ = this.reset.asObservable();

  updateState(
    value: number,
    command: 'seconds'|'hours'|'minutes'
  ): void {
    const update = this.timerState.value;
    if (value < 0 ) value = 0;
    update[command] = value;
    update.totalTime = this.convertToSeconds(update);
    this.timerState.next(update);
  }

  convertToSeconds(update: ICountDown): number {
    const seconds = update.seconds; 
    const minutesToSeconds = update.minutes * 60;
    const hoursToSeconds = (update.hours * 60) * 60;
    return seconds + minutesToSeconds + hoursToSeconds;
  }

  getSeconds(): number {
    return this.timerState.value.seconds;
  }
  getMinutes(): number {
    return this.timerState.value.minutes;
  }
  getHours(): number {
    return this.timerState.value.hours;
  }
  getTotalSeconds(): number {
    return this.timerState.value.totalTime;
  }

  startTimer(): void {
    setTimeout(() => {
      this.start.next();
    }, 0);
  }
  pauseTimer(): void {
    this.pause.next();
  }
  resetTimer(): void {
    this.reset.next();
  }

}

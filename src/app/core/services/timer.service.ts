import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IClock {
  seconds: number;
  minutes: number;
  hours: number;
  totalTime: number; // mm
}

@Injectable()
export class TimerService {

  private state = new BehaviorSubject<IClock>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    totalTime: 0,
  });

  action$ = this.state.asObservable();

  /**
   * Un metodo para actualizar el state del timer.
   * @param value el valor de la propiedad del comando
   * @param command 'seconds'|'hours'|'minutes'
   */
  updateState(value: number, command: 'seconds'|'hours'|'minutes'): void {
    const update = this.state.value;
    if (value < 0 ) value = 0;
    update[command] = value;
    update.totalTime = this.convertToSeconds(update);
    this.state.next(update);
  }

  convertToSeconds(update: IClock): number {
    const seconds = update.seconds; 
    const minutesToSeconds = update.minutes * 60;
    const hoursToSeconds = (update.hours * 60) * 60;
    return seconds + minutesToSeconds + hoursToSeconds;
  }

  getSeconds(): number {
    return this.state.value.seconds;
  }
  getMinutes(): number {
    return this.state.value.minutes;
  }
  getHours(): number {
    return this.state.value.hours;
  }
  getTotalSeconds(): number {
    return this.state.value.totalTime;
  }

}

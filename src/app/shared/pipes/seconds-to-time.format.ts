import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTimeFormat',
  pure: true
})
export class SecondsToTimeFormat implements PipeTransform {
  
  transform(value: number, args?: any): string {
    const hours = Math.floor((value / 60) / 60);
    const minutes = Math.floor(value / 60) % 60;
    const seconds = value % 60;

    return `${this.padding(hours)}${hours}:${this.padding(minutes)}${minutes}:${this.padding(seconds)}${seconds}`;
  }

  private padding(time: number) {
    return time < 10 ? '0' : '';
  }


}
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit {
  timeInMs = 60;

  get timeInSeconds(): number {
    return this.timeInMs;
  }

  @Input() set timeInSeconds(value: number) {
    this.timeInMs = value;
  }

  constructor() { }

  ngOnInit() {}

}

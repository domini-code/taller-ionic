import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataState } from '@shared/interfaces';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  dataState: IDataState;
  loading = true;

  constructor(
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.dataState = this.router.getCurrentNavigation().extras.state as IDataState;
    if (!this.dataState) {
      this.router.navigate(['/']);
    } else {
      this.loading = false;
    }
  }

  goToSetup() {
    this.router.navigate(['/']);
  }

}

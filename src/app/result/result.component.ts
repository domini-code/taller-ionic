import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  data: any;
  constructor(
    private router: Router,
  ) {
    this.data = this.router.getCurrentNavigation().extras.state;
  }
  
  ngOnInit(): void {
  }

  goToSetup() {
    this.router.navigate(['/']);
  }

}

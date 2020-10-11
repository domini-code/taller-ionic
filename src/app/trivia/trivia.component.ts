import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../core/services/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit {

  constructor(private triviaService: TriviaService) {
  }

  ngOnInit(): void {
  }

}

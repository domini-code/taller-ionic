import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../core/services/trivia.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {
    // this.triviaService.getCategories().subscribe();
  }

}

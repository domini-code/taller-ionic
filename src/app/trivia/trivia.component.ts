import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@core/services/localstorage.service';
import { TriviaService } from '@core/services/trivia.service';
import { Trivia } from '@shared/interfaces';

interface Config {
  difficulty: string;
  category: number;
}

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit {
  config: Config;
  trivia: Trivia[];
  loading = false;

  constructor(
    private router: Router,
    private triviaSrv: TriviaService
  ) {
    this.loading = true;
    this.config = this.router.getCurrentNavigation().extras.state?.config as Config;
    if (!this.config) {
      this.router.navigate(['/']);
    }
    this.createTrivia();
  }

  ngOnInit(): void {
  }

  createTrivia() {
    const { difficulty, category } = this.config;
    this.loading = true;
    this.triviaSrv.getTrivias(difficulty, category)
      .subscribe(trivia => {
        this.trivia = trivia;
        this.loading = false;
      });
  }

}

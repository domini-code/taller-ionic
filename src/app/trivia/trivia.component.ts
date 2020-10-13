import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '@core/services/trivia.service';
import { Trivia } from '@shared/interfaces';
import { BehaviorSubject, of, Subject } from 'rxjs';

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

  startTimer$: Subject<void> = new Subject();
  pauseTimer$: Subject<void> = new Subject();
  resetTimer$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private triviaSrv: TriviaService
  ) {
    this.loading = true;
    this.config = this.router.getCurrentNavigation().extras.state?.config as Config;
    if (!this.config) {
      // this.router.navigate(['/']); // Descomentar luego
      this.config = { // Eliminar luego.
        category: 1,
        difficulty: 'easy'
      };
    }
    this.createTrivia();
  }

  ngOnInit(): void {
    this.startTimer();
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

  startTimer() {
    this.startTimer$.next();
  }
  pauseTimer() {
    this.pauseTimer$.next();
  }
  resetTimer() {
    this.resetTimer$.next();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '@core/services/trivia.service';
import shuffleArray from '@shared/helpers/shuffle-array.helper';
import { Trivia } from '@shared/interfaces';
import { IDataState } from '@shared/interfaces';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss'],
})
export class TriviaComponent implements OnInit {
  private _counter = 0;
  get counter() {
    return this._counter;
  }
  set counter(value: number) {
    if (this.counter >= 4) {
      // 'No hay mas preguntas'
      const state = {
        correctAnswers: this.correctAnswers,
        ...this.dataState
      };
      this.gameOver = true;
      this.router.navigate(['/result'], { state });
    } else {
      this._counter = value;
    }
  }

  dataState: IDataState;
  trivia: Trivia[] = [];
  correctAnswers = 0;
  loading = true;
  gameOver = false;
  selectedQuestion: Trivia;

  constructor(
    private router: Router,
    private triviaSrv: TriviaService
  ) {
    this.dataState = this.router.getCurrentNavigation().extras.state?.dataState as IDataState;
    if (!this.dataState) {
      this.router.navigate(['/']);
    }
    this.createTrivia();
  }

  ngOnInit(): void { }

  createTrivia() {
    const { difficulty, category: {id} } = this.dataState;
    this.triviaSrv.getTrivias(difficulty, id)
      .subscribe((trivia) => {
        this.trivia = trivia;
        this.selectedQuestion = trivia[0];
        this.setupRandomQuestions();
        this.loading = false;
      });
  }

  selectedAnswer(answer: string) {
    if (!this.gameOver) {
      if (answer === this.selectedQuestion.correct_answer) {
        this.correctAnswers++;
      } else {
        // Ha fallado en la respuesta...
      }
      this.nextQuestion();
    }
  }

  nextQuestion() {
    this.counter++;
    this.selectedQuestion = this.trivia[this.counter];
    this.setupRandomQuestions();
  }

  setupRandomQuestions() {
    const { correct_answer, incorrect_answers } = this.selectedQuestion;
    this.selectedQuestion.randomAnswers = shuffleArray([
      correct_answer,
      ...incorrect_answers,
    ]);
  }
}

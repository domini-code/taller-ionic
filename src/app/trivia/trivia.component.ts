import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '@core/services/trivia.service';
import { CountDownService } from '@shared/components/count-down/count-down.service';
import shuffleArray from '@shared/helpers/shuffle-array.helper';
import { Trivia } from '@shared/interfaces';

interface Config {
  difficulty: string;
  category: number;
}

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
        takenTime: this.takenTime,
        correctAnswers: this.goodAnswer,
        category: this.config.category,
        difficulty: this.config.difficulty,
      };
      this.gameOver = true;
      this.router.navigate(['/result'], { state });
    } else {
      this._counter = value;
    }
  }

  initialTime = 10;
  currentTime: number;
  takenTime = 0;
  config: Config;
  trivia: Trivia[] = [];
  goodAnswer = 0;
  loading = true;
  gameOver = false;
  selectedQuestion: Trivia;

  constructor(
    private router: Router,
    private triviaSrv: TriviaService,
    private countDownSrv: CountDownService
  ) {
    this.loading = true;
    this.config = this.router.getCurrentNavigation()
      .extras.state?.config as Config;
    if (!this.config) {
      this.router.navigate(['/']);
    }
    this.createTrivia();
  }

  ngOnInit(): void {
    this.countDownSrv.startTimer();
  }

  createTrivia() {
    const { difficulty, category } = this.config;
    this.triviaSrv.getTrivias(difficulty, category)
      .subscribe((trivia) => {
        this.trivia = trivia;
        this.selectedQuestion = trivia[0];
        this.setupRandomQuestions();
        this.countDownSrv.startTimer();
        this.loading = false;
      });
  }

  getTime(event: number) {
    this.currentTime = event;
  }

  selectedAnswer(answer: string) {
    this.countDownSrv.pauseTimer();
    if (!this.gameOver) {
      if (answer === this.selectedQuestion.correct_answer) {
        this.goodAnswer++;
      } else {
        // Ha fallado en la respuesta...
      }
      this.takenTime += this.initialTime - this.currentTime;
      this.countDownSrv.resetTimer();
      this.nextQuestion();
      this.countDownSrv.startTimer();
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

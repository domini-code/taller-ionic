import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '@core/services/trivia.service';
import shuffleArray from '@shared/helpers/shuffle-array.helper';
import { Trivia } from '@shared/interfaces';
import { Subject } from 'rxjs';
import { mockTriviaData } from './trivia.mock';

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
  private _counter = 0;
  get counter() {
    return this._counter;
  }
  set counter(value: number) {
    if (this.counter >= 4) {
      // 'No hay mas preguntas'
      console.log(`
        Has terminado el juego en ${this.takenTime}
        Con un ascierto de ${this.goodAnswer}/5 respuestas correctas.

        GAME OVER!
      `);
      const state = {
        takenTime: this.takenTime,
        correctAnswers: this.goodAnswer,
        category: this.config.category,
        difficulty: this.config.difficulty
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
      this.router.navigate(['/']);
    }
    this.createTrivia();
  }
  
  ngOnInit(): void { }

  createTrivia() {
    const { difficulty, category } = this.config;
    this.loading = true;
    this.triviaSrv.getTrivias(difficulty, category)
      .subscribe(trivia => {
        this.trivia = trivia;
        this.selectedQuestion = trivia[0];
        this.setupRandomQuestions();
        this.startTimer();   
        this.loading = false;
      });
  }

  getTime(event: number) {
    this.currentTime = event;
  }
  startTimer() {
    setTimeout(() => { // Se usa el setTimeout para que el observable inicia antes.
      this.startTimer$.next();
    }, 0);
  }
  pauseTimer() {
    this.pauseTimer$.next();
  }
  resetTimer() {
    this.resetTimer$.next();
  }

  selectedAnswer(answer: string) {
    this.pauseTimer();
    if (this.gameOver) {
      return;
    }
    if (answer === this.selectedQuestion.correct_answer) {
      this.goodAnswer++;
    } else {
      // Ha fallado la respuesta...
    }
    this.takenTime += (this.initialTime - this.currentTime);
    
    if (!this.gameOver) {
      this.resetTimer();
      this.nextQuestion();
      this.startTimer();
      return;
    }
  }

  nextQuestion() {
    this.counter++;
    this.selectedQuestion = this.trivia[this.counter];
    this.setupRandomQuestions();
  }

  setupRandomQuestions() {
    const {correct_answer, incorrect_answers} = this.selectedQuestion;
    this.selectedQuestion.randomAnswers = shuffleArray([
      correct_answer,
      ...incorrect_answers
    ]);
  }

  


}

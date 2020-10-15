import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '@core/services/trivia.service';
import shuffleArray from '@shared/helpers/shuffle-array.helper';
import { Trivia } from '@shared/interfaces';
import { Subject } from 'rxjs';

interface Config {
  difficulty: string;
  category: number;
}

const mockTriviaData = [
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which band released songs such as &quot;Electric Feel&quot;, &quot;Kids&quot;, and &quot;Time to Pretend&quot;?',
    correct_answer: 'MGMT',
    incorrect_answers: ['Passion Pit', 'Phoenix', 'Franz Ferdinand'],
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which one of these rappers is NOT a member of the rap group Wu-Tang Clan?',
    correct_answer: 'Dr.Dre',
    incorrect_answers: ['Ol&#039; Dirty Bastard', 'GZA', 'Method Man'],
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'What date is referenced in the 1971 song &quot;September&quot; by Earth, Wind &amp; Fire?',
    correct_answer: '21st of September',
    incorrect_answers: [
      '26th of September',
      '23rd of September',
      '24th of September',
    ],
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question: 'Which genre of Hip Hop does MC Frontalot rap?',
    correct_answer: 'Nerdcore',
    incorrect_answers: ['Horrorcore', 'Christian', 'Crunk'],
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'The Proclaimers - I&#039;m Gonna Be (500 Miles) reached what position on the US Hot 100 Charts in 1993?',
    correct_answer: '3rd',
    incorrect_answers: ['8th', '1st', '5th'],
  },
];

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
      this.gameOver = true;
      return;
    } else {
      this._counter = value;
    } 
  }

  initialTime = 10;
  currentTime: number;
  takenTime = 0;
  config: Config;
  trivia: Trivia[] = mockTriviaData; // TODO: Quitar inicializacion al terminar el dev.
  selectedQuestion = this.trivia[this.counter];
  goodAnswer = 0;
  loading = false;
  gameOver = false;
  
  startTimer$: Subject<void> = new Subject();
  pauseTimer$: Subject<void> = new Subject();
  resetTimer$: Subject<void> = new Subject();
  

  constructor(
    private router: Router,
    private triviaSrv: TriviaService
  ) {
    // this.loading = true; // TODO: uncomment when dev finished
    this.config = this.router.getCurrentNavigation().extras.state?.config as Config;
    if (!this.config) {
      // this.router.navigate(['/']); // TODO: uncomment when dev finished
      this.config = { // TODO: Eliminar luego.
        category: 1,
        difficulty: 'easy'
      };
    }
    // this.createTrivia(); // TODO: uncomment when dev finished
  }
    
  ngOnInit(): void {
    this.setupRandomQuestions();
    this.startTimer();
  }

  getTime(event: number) {
    this.currentTime = event;
  }
  startTimer() {
    setTimeout(() => { // Se usa el setTimeout
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
    const { correct_answer } = this.selectedQuestion;
    if (answer === correct_answer) {
      this.goodAnswer++;
    } else {
      // Ha fallado la respuseta...
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
    this.selectedQuestion.randomAnswers = shuffleArray([correct_answer, ...incorrect_answers]);
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

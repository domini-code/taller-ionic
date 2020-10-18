import { TriviaCategory } from './../shared/interfaces/category.interface';
import { Component  } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TriviaService } from '@core/services/trivia.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  setupForm: FormGroup;
  categories$ = this.triviaService.getCategories();

  constructor(
    private triviaService: TriviaService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.initForm();
  }

  goToTrivia(): void {
    const { difficulty, category: categoryId } = this.setupForm.value;
    const category = this.triviaService.categories.find(x => x.id === categoryId);
    this.router.navigate(['/trivia'], {
      state: {
        dataState: {
          difficulty,
          category
        }
      }
    });
    this.setupForm.reset();
  }

   private initForm(): void {
    this.setupForm = this.fb.group({
      category: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
    });
  }
}

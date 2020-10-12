import { TriviaCategory } from './../shared/interfaces/category.interface';
import { Observable } from 'rxjs';
import {   LocalStorageService } from './../core/services/localstorage.service';
import { Component,  } from '@angular/core';
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
    private localStorageSvc: LocalStorageService
  ) {
    this.initForm();
  }

  goToTrivia(): void {
    const config = this.setupForm.value;
    this.router.navigate(['/trivia'], {
      state: {
        config
      }
    });
  }

  private initForm(): void {
    this.setupForm = this.fb.group({
      category: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
    });
  }
}

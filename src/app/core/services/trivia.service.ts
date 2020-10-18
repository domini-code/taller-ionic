import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';
import {
  TriviaCategory,
  TriviaCategoriesResponse,
  TriviaResponse,
  Trivia
} from '@shared/interfaces';
import { pluck, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TriviaService {
  categories: TriviaCategory[];

  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<TriviaCategory[]> {
    const url = `${environment.apiUrl}/api_category.php`;
    return this.http.get<TriviaCategoriesResponse>(url).pipe(
      pluck('trivia_categories'),
      tap(categories => this.categories = categories)
    );
  }

  getTrivias(difficulty: string, categoryId: number): Observable<Trivia[]> {
    const url = `${environment.apiUrl}/api.php`;
    const params = new HttpParams({
      fromObject: {
        difficulty,
        category: categoryId.toString(),
        amount: '5',
        type: 'multiple',
      },
    });
    return this.http
      .get<TriviaResponse>(url, { params })
      .pipe(
        pluck('results'),
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { TriviaCategory, TriviaCategoryResponse } from '@shared/interfaces/category.interface';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class TriviaService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<TriviaCategory[]> {
    const url = `${environment.apiUrl}/api_category.php`;
    return this.http.get<TriviaCategoryResponse>(url)
      .pipe(
        pluck('trivia_categories')
      );
  }
}

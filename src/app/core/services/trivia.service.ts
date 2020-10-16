import { LocalStorageService } from '@core/services/localstorage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';
import {
  TriviaCategory,
  TriviaCategoriesResponse,
  RequestTokenResponse,
  TriviaResponse,
  Trivia
} from '@shared/interfaces';
import { pluck, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TriviaService {
  token: string;
  constructor(private http: HttpClient, private localStorageSvc: LocalStorageService) {
    // this.checkToken(); // FIXME: Fails after one day with no use. We need to recreate it if older than few hours. 
  }

  getCategories(): Observable<TriviaCategory[]> {
    const url = `${environment.apiUrl}/api_category.php`;
    return this.http.get<TriviaCategoriesResponse>(url).pipe(pluck('trivia_categories'));
  }

  getTrivias(difficulty: string, categoryId: number): Observable<Trivia[]> {
    const url = `${environment.apiUrl}/api.php`;
    const params = new HttpParams({
      fromObject: {
        difficulty,
        category: categoryId.toString(),
        amount: '5',
        type: 'multiple',
        // token: this.token
      },
    });
    return this.http
      .get<TriviaResponse>(url, { params })
      .pipe(
        pluck('results'),
        tap(results =>
          this.localStorageSvc.saveInfo('trivia', results))
      );
  }

  resetToken(token: string) {
    const url = `${environment.apiUrl}/api_token.php?command=reset`;
    return this.http.get<RequestTokenResponse>(url);
  }

  /**
   * Si no hay token en el LS genera uno nuevo y le salva.
   */
  private checkToken(): void {
    this.token = this.localStorageSvc.getInfo('token') as string;
    if (!this.token) {
      this.getNewToken().subscribe((data) => {
        this.token = data;
        console.log(data);
        this.localStorageSvc.saveInfo('token', data);
      });
    }
  }

  private getNewToken(): Observable<string> {
    const url = `${environment.apiUrl}/api_token.php?command=request`;
    return this.http.get<RequestTokenResponse>(url).pipe(pluck('token'));
  }
}

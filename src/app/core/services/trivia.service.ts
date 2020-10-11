import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Category } from '@shared/interfaces/category.interface';


@Injectable()
export class TriviaService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category> {
    const url = `${environment.apiUrl}/api_category.php`;
    return this.http.get<Category>(url);
  }
}

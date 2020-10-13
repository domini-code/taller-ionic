import { TriviaCategory } from '@shared/interfaces/category.interface';
import { Injectable } from '@angular/core';
import { Config } from '@shared/interfaces';

@Injectable()
export class LocalStorageService {

  saveInfo(key: string, value: string |object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getInfo(key: string): string |object {
    return JSON.parse(localStorage.getItem(key));
  }

  removeInfo(): void{
    localStorage.removeItem('config');
  }
}

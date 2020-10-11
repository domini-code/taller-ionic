import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriviaRoutingModule } from './trivia-routing.module';
import { TriviaComponent } from './trivia.component';


@NgModule({
  declarations: [TriviaComponent],
  imports: [
    CommonModule,
    TriviaRoutingModule
  ]
})
export class TriviaModule { }

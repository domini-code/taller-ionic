import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriviaRoutingModule } from './trivia-routing.module';


@NgModule({
  declarations: [
    TriviaRoutingModule.components
  ],
  imports: [
    CommonModule,
    TriviaRoutingModule
  ]
})
export class TriviaModule { }

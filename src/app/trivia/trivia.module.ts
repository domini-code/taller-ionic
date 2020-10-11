import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriviaRoutingModule } from './trivia-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    TriviaRoutingModule.components
  ],
  imports: [
    CommonModule,
    TriviaRoutingModule,
    SharedModule
  ]
})
export class TriviaModule { }

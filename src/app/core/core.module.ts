import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TriviaService } from './services/trivia.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
  ],
  exports: [
    HttpClientModule,
  ],
  providers: [
    TriviaService
  ]
})
export class CoreModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyCardComponent } from './components/body-card/body-card.component';
import { CountDownComponent } from './components/count-down/count-down.component';
import { SecondsToTimeFormat } from './pipes/seconds-to-time.format';

@NgModule({
  declarations: [
    BodyCardComponent,
    SecondsToTimeFormat,
    CountDownComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  exports: [
    ReactiveFormsModule,
    IonicModule,
    BodyCardComponent,
    CountDownComponent
  ]
})
export class SharedModule {}
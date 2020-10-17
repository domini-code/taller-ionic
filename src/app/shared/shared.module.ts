import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyCardComponent } from './components/body-card/body-card.component';
import { CountDownComponent } from './components/count-down/count-down.component';
import { SecondsToTimeFormat } from './pipes/seconds-to-time.format';
import { CountDownService } from './components/count-down/count-down.service';

@NgModule({
  declarations: [
    BodyCardComponent,
    SecondsToTimeFormat,
    CountDownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [CountDownService],
  exports: [
    ReactiveFormsModule,
    IonicModule,
    BodyCardComponent,
    CountDownComponent,
    CountDownService
  ]
})
export class SharedModule {}
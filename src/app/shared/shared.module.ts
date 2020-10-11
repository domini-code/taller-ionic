import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyCardComponent } from './components/body-card/body-card.component';

@NgModule({
  declarations: [BodyCardComponent],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  exports: [
    ReactiveFormsModule,
    IonicModule,
    BodyCardComponent
  ]
})
export class SharedModule {}
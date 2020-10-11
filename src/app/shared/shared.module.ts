import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  exports: [
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule {}
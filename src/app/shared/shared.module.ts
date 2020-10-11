import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [ReactiveFormsModule, IonicModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule {}
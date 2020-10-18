import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyCardComponent } from './components/body-card/body-card.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    BodyCardComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [],
  exports: [
    ReactiveFormsModule,
    IonicModule,
    BodyCardComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {}
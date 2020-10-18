import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyCardComponent } from './components/body-card/body-card.component';
import { CountDownComponent } from './components/count-down/count-down.component';
import { CountDownService } from './components/count-down/count-down.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SecondsToTimeFormat } from './pipes/seconds-to-time.format';

@NgModule({
  declarations: [
    BodyCardComponent,
    SecondsToTimeFormat,
    CountDownComponent,
    HeaderComponent,
    FooterComponent
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
    CountDownService,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {}
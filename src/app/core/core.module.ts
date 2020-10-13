import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { TriviaService } from './services/trivia.service';
import { TimerService } from './services/timer.service';
import { LocalStorageService } from './services/localstorage.service';
import { LoadingService } from './services/loading.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
  ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    TriviaService,
    TimerService,
    LocalStorageService,
    LoadingService
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}

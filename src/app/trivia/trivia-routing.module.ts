import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriviaComponent } from './trivia.component';

const routes: Routes = [{ path: '', component: TriviaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TriviaRoutingModule {
  static components = [ TriviaComponent ];
}

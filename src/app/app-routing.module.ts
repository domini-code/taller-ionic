import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule),
  },
  {
    path: 'trivia',
    loadChildren: () => import('./trivia/trivia.module').then(m => m.TriviaModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then(m => m.ResultModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then(m => m.ResetModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

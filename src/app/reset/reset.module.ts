import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetRouterModule } from './reset-routing.module';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ResetRouterModule.components
  ],
  imports: [
    CommonModule,
    ResetRouterModule,
    SharedModule
  ]
})
export class ResetModule { }

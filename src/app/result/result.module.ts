import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ResultRoutingModule.components
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    SharedModule
  ]
})
export class ResultModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDetailsRoutingModule } from './question-details-routing.module';
import { QuestionDetailsComponent } from './question-details.component';

@NgModule({
  imports: [
    CommonModule,
    QuestionDetailsRoutingModule
  ],
  declarations: [QuestionDetailsComponent],
  exports: [QuestionDetailsComponent]
})
export class QuestionDetailsModule { }

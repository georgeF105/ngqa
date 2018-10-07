import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    MatCardModule,
    MatBadgeModule
  ],
  declarations: [QuestionsComponent],
  exports: [QuestionsComponent]
})
export class QuestionsModule { }

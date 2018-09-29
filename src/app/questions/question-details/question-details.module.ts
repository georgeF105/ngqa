import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDetailsRoutingModule } from './question-details-routing.module';
import { QuestionDetailsComponent } from './question-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    QuestionDetailsRoutingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [QuestionDetailsComponent],
  exports: [QuestionDetailsComponent]
})
export class QuestionDetailsModule { }

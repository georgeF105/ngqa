import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionDetailsComponent } from './question-details.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionDetailsRoutingModule { }

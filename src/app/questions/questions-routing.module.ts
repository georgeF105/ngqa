import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '../user/guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: ':key',
        loadChildren: './question-details/question-details.module#QuestionDetailsModule'
      },
      {
        path: '',
        loadChildren: '../questions/questions/questions.module#QuestionsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }

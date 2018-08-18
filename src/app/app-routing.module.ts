import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shell/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'question',
        loadChildren: './questions/question-details/question-details.module#QuestionDetailsModule'
      },
      {
        path: 'questions',
        loadChildren: './questions/questions/questions.module#QuestionsModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'questions'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

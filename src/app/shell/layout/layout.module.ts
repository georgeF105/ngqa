import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule
  ],
  declarations: [LayoutComponent],
  entryComponents: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule { }

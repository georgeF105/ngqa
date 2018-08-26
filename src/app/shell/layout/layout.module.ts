import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [LayoutComponent],
  entryComponents: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule { }

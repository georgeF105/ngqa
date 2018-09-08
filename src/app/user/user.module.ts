import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { StoreModule } from '@ngrx/store';
import { reducer, FEATURE_NAME } from './user.reducer';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(FEATURE_NAME, reducer)
  ],
  declarations: []
})
export class UserModule {
  constructor () {

    console.log('here!!!!');
  }
}

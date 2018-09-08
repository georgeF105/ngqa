import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogInUserAction } from '../../user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _store: Store<any>
  ) { }

  ngOnInit() {
  }

  public logIn(): void {
    this._store.dispatch(new LogInUserAction());
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogInUserAction, LogOutUserAction, GetUserLoginStatusAction } from '../../user/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userState$: Observable<any>;

  constructor(
    private _store: Store<any>
  ) { }

  ngOnInit() {
    this._store.dispatch(new GetUserLoginStatusAction());
    this.userState$ = this._store.select(state => state.user);
  }

  public logIn(): void {
    this._store.dispatch(new LogInUserAction());
  }

  public logOut(): void {
    this._store.dispatch(new LogOutUserAction());
  }

}

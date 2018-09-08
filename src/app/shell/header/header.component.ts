import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogInUserAction, LogOutUserAction } from '../../user/user.actions';
import { FirebaseService } from '../../firebase/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userState$: Observable<any>;

  constructor(
    private _store: Store<any>,
    private _firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this._firebaseService.listenToLogInStatus();
    this.userState$ = this._store.select(state => state.user);
  }

  public logIn(): void {
    this._store.dispatch(new LogInUserAction());
  }

  public logOut(): void {
    this._store.dispatch(new LogOutUserAction());
  }

}

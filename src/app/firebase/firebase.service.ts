import { Injectable } from '@angular/core';
import { initializeApp, app, auth } from 'firebase';
import { User } from '@ngqa/models';
import { Store } from '@ngrx/store';
import { LogInUserSuccessAction } from '../user/user.actions';

const options = {
  apiKey: 'AIzaSyCMmdgK3sCxCVBNY-vydP6zTmsfSd8ApZY',
  authDomain: 'ngqa-bad8d.firebaseapp.com',
  databaseURL: 'https://ngqa-bad8d.firebaseio.com',
  projectId: 'ngqa-bad8d',
  storageBucket: 'ngqa-bad8d.appspot.com',
  messagingSenderId: '631789153871'
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private _app: app.App;

  constructor(
    private _store: Store<any>
  ) { }

  private _initializeApp (): void {
    if (this._app) {
      return;
    }
    this._app = initializeApp(options, 'NGQA');
  }

  public logInUser (): Promise<User> {
    this._initializeApp();
    const provider = new auth.GoogleAuthProvider();
    return this._app.auth().signInWithPopup(provider)
      .then(userCredential => {
        return userCredential.user.getIdToken()
          .then(token => {
            return {
              key: userCredential.user.uid,
              token,
              name: userCredential.user.displayName,
              email: userCredential.user.email
            };
          });
      });
  }

  public logOutUser (): Promise<void> {
    this._initializeApp();
    return this._app.auth().signOut();
  }

  public listenToLogInStatus (): void {
    this._initializeApp();
    this._app.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(token => {
          this._store.dispatch(new LogInUserSuccessAction({
            key: user.uid,
            token,
            name: user.displayName,
            email: user.email
          }));
        });
      }
    });
  }
}

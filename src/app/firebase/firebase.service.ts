import { Injectable } from '@angular/core';
import { initializeApp, app, auth } from 'firebase';
import { User } from '@ngqa/models';
import { Store } from '@ngrx/store';

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

  public listenToLogInStatus (): Promise<User> {
    this._initializeApp();
    return new Promise((resolve, reject) => {
      this._app.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        }
      });
    }).then((user: firebase.User) => {
      return user.getIdToken().then(token => {
        return {
          key: user.uid,
          token,
          name: user.displayName,
          email: user.email
        };
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { auth } from 'firebase';
import { User } from '@ngqa/models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {

  constructor(
    private _firebaseService: FirebaseService
  ) { }

  public logInUser (): Promise<User> {
    const provider = new auth.GoogleAuthProvider();
    return this._firebaseService.app().auth().signInWithPopup(provider)
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
    return this._firebaseService.app().auth().signOut();
  }

  public listenToLogInStatus (): Promise<User> {
    return new Promise((resolve, reject) => {
      this._firebaseService.app().auth().onAuthStateChanged(user => {
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

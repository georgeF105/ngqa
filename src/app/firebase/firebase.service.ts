import { Injectable } from '@angular/core';
import { initializeApp, app } from 'firebase';

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

  public app (): app.App {
    if (!this._app) {
      this._app = initializeApp(options, 'NGQA');
    }
    return this._app;
  }
}

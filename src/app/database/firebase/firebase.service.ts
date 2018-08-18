import { Injectable } from '@angular/core';
import { database, initializeApp, app } from 'firebase';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Question } from '../types';

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
  private app: app.App;

  constructor() {
    this.app = initializeApp(options, 'NGQA');
  }

  public getQuestions (): Observable<Array<Question>> {
    return this.getNormal('questions').pipe(
      map(questionsMap => {
        return Object.keys(questionsMap).map(key => (<Question>questionsMap[key]));
      })
    );
  }

  private getNormal<T>(path: string): Observable<T> {
    const result$ = new Subject<T>();
    const ref = this.app.database().ref(path);
    ref.on('value', snapshot => {
      const result = {
        ...snapshot.val()
      };
      result$.next(result);
    });

    return result$.pipe(
      tap(
        val => console.log('got val', val),
        err => console.error('got error', err),
        () => {
          console.log('closing listener for', path);
          ref.off();
        }
      )
    );
  }
}

import { Injectable } from '@angular/core';
import { database, initializeApp, app } from 'firebase';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const options = {
  apiKey: 'AIzaSyCMmdgK3sCxCVBNY-vydP6zTmsfSd8ApZY',
  authDomain: 'ngqa-bad8d.firebaseapp.com',
  databaseURL: 'https://ngqa-bad8d.firebaseio.com',
  projectId: 'ngqa-bad8d',
  storageBucket: 'ngqa-bad8d.appspot.com',
  messagingSenderId: '631789153871'
};

export type Key = string;

export interface FirebaseStoreItem {
  key: Key;
}

export interface Directory<T> {
  [key: string]: T;
}
export interface FirebaseStoreBase { [key: string]: Directory<any>; }

@Injectable({
  providedIn: 'root'
})
export class FirebaseService<S extends FirebaseStoreBase> {
  private app: app.App;

  constructor() {
    this.app = initializeApp(options, 'NGQA');
  }

  public getChildren<P extends keyof S, T extends S[P][Key]>(path: P): Observable<T[]> {
    const result$ = new Subject<T>();
    const ref = this.app.database().ref(path as string);
    ref.on('value', snapshot => {
      const val = snapshot.val() as Directory<T>;
      const result = Object.keys(val).map(key => {
        return {
          key,
          ...(val[key] as Object)
        };
      }) as T;

      result$.next(result);
    });

    return result$.pipe(
      tap(
        val => console.log('got val', val),
        err => console.error('got error', err),
        () => {
          console.log('closing listener for', path);
          ref.off('value');
        }
      )
    );
  }

  public getChild<P extends keyof S, T extends S[P][Key]>(path: P, key: Key): Observable<T> {
    const result$ = new Subject<T>();
    const ref = this.app.database().ref(path as string).child(key);
    ref.on('value', snapshot => {
      const val = snapshot.val() as T;
      const result = {
        key,
        ...(val as Object)
      } as T;

      result$.next(result);
    });

    return result$.pipe(
      tap(
        val => console.log('got child val', val),
        err => console.error('got child error', err),
        () => {
          console.log('closing listener for', path);
          ref.off('value');
        }
      )
    );
  }
}

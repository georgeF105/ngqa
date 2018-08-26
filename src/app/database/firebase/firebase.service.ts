import { Injectable } from '@angular/core';
import { initializeApp, app } from 'firebase';
import { Observable, Subject, OperatorFunction } from 'rxjs';
import { tap, map, refCount, share, finalize } from 'rxjs/operators';

const options = {
  apiKey: 'AIzaSyCMmdgK3sCxCVBNY-vydP6zTmsfSd8ApZY',
  authDomain: 'ngqa-bad8d.firebaseapp.com',
  databaseURL: 'https://ngqa-bad8d.firebaseio.com',
  projectId: 'ngqa-bad8d',
  storageBucket: 'ngqa-bad8d.appspot.com',
  messagingSenderId: '631789153871'
};

export type Key = string;

export type LinkedItem<S> = {
  [N in keyof S]?: Key | Directory<Key>;
};

export interface FirebaseItem {
  key: Key;
}

export interface Directory<T> {
  [key: string]: T;
}

export interface ReadOptions {
  sortBy?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService<S> {
  private app: app.App;

  constructor() {
    this.app = initializeApp(options, 'NGQA');
  }

  public getItem<P1 extends keyof S> (path: [P1], readOptions?: ReadOptions): Observable<S[P1]>;
  public getItem<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    T extends S[P1][P2]> (path: [P1, P2], readOptions?: ReadOptions): Observable<T>;
  public getItem<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    T extends S[P1][P2][P3]> (path: [P1, P2, P3], readOptions?: ReadOptions): Observable<T>;

  public getItem<P extends Array<string>, T> (path: P): Observable<T> {
    const result$ = new Subject<T>();

    const fullPath = path.join('/');
    const ref = this.app.database().ref(fullPath);
    ref.on('value', snapshot => result$.next(snapshot.val()));

    return result$.pipe(
      finalize(() => ref.off('value'))
    );
  }
}

export function toList<T extends FirebaseItem>(): OperatorFunction<Directory<T>, Array<T>> {
  return source => source.pipe(
    map(directory => Object.keys(directory).map(key => {
      const value = directory[key];
      return {
        key,
        ...(value as Object)
      } as T;
    }
  )));
}

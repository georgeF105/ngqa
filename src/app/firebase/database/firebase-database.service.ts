import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Directory, Key } from '@ngqa/models';

export interface ReadOptions {
  sortBy?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService<S> {

  constructor(
    private _firebaseService: FirebaseService
  ) { }

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

    const ref = this.getRef(path);
    ref.on('value', snapshot => result$.next(snapshot.val()));

    return result$.pipe(
      finalize(() => ref.off('value'))
    );
  }

  public addItem<
    P1 extends keyof S,
    K extends keyof S[P1] & Key,
    D extends S[P1] & Directory<S[P1][K]>,
    I extends D[K]> (path: [P1], item: I): Promise<K>;
  public addItem<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    K extends keyof S[P1][P2] & Key,
    D extends S[P1] & Directory<S[P1][P2][K]>,
    I extends D[K]> (path: [P1, P2], item: I): Promise<K>;
  public addItem<P extends Array<string>> (path: P, item: any): Promise<Key> {
    return new Promise((resolve, reject) => {
      this.getRef(path).push(item).then(val => {
        resolve(val.key);
      }, err => {
        reject(err);
      });
    });
  }

  private getRef (path: Array<Key>): firebase.database.Reference {
    const fullPath = path.join('/');
    return this._firebaseService.app().database().ref(fullPath);
  }
}

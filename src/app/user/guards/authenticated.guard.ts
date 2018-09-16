import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserSelectors } from '../user.selectors';
import { map, filter, tap } from 'rxjs/operators';
import { GetUserLoginStatusAction } from '../user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor (
    private _store: Store<any>,
    private _router: Router
  ) { }

  canActivate(): Observable<boolean> {
    this._store.dispatch(new GetUserLoginStatusAction());
    return this._store.select(UserSelectors.user).pipe(
      filter(user => !user.isLoading),
      map(user => !!user.user),
      tap(canActivate => {
        if (!canActivate) {
          this._router.navigate(['']);
        }
      })
    );
  }
}

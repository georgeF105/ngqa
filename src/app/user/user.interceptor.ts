import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserSelectors } from './user.selectors';
import { switchMap } from 'rxjs/operators';
import { Provider, Injectable } from '@angular/core';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor (
    private _store: Store<any>
  ) { }

  public intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._store.select(UserSelectors.userTokenId).pipe(
      switchMap(tokenId => {
        if (tokenId) {
          return next.handle(req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokenId}`
            }
          }));
        }
        return next.handle(req);
      })
    );
  }
}

export const UserInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true
};

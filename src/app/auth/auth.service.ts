import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registerd?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    tokenExpirationTimer: any;
    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) {}

    signup(email: string, password: string) {
        return this.httpClient
            .post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(respData => {
                    this.handleAuthResponse(
                        respData.email,
                        respData.localId,
                        respData.idToken,
                        +respData.expiresIn
                    );
                })
            );
    }

    login(email: string, password: string) {
        return this.httpClient
            .post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthResponse(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.store.dispatch(
                new AuthActions.Login({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationData: new Date(userData._tokenExpirationDate)
                })
            );
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDate: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDate);
    }

    private handleAuthResponse(
        email: string,
        userId: string,
        idToken: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        this.store.dispatch(
            new AuthActions.Login({
                email: email,
                userId: userId,
                token: idToken,
                expirationData: expirationDate
            })
        );
        this.autoLogout(expiresIn * 1000);
        // localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errRes: HttpErrorResponse) {
        let errorMessage = 'An unkown error occured.';
        if (!errRes.error || !errRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage =
                    'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage =
                    'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage =
                    'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage =
                    'The user account has been disabled by an administrator.';
                break;
        }
        return throwError(errorMessage);
    }
}

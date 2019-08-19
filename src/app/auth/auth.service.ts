import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, TimeoutError } from 'rxjs';
import { User } from './user.model';

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
    user = new BehaviorSubject<User>(null);
    constructor(private httpClient: HttpClient) { }

    signup(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDVpcwt6pZSvru2kSO-EVoV-GSEBwL6RI',
            {
                email: email,
                password: password,
                returnSercureToken: true
            }
        ).pipe(catchError(this.handleError), tap(respData => {
            this.handleAuthResponse(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
        }
        ));
    }
    signin(email: string, password: string) {
      console.log('signin' + email + '   ' + password);
        return this.httpClient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDVpcwt6pZSvru2kSO-EVoV-GSEBwL6RI',
            {
                email: email,
                password: password,
                returnSercureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(respData => {
                this.handleAuthResponse(
                    respData.email,
                    respData.localId,
                    respData.idToken,
                    +respData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
      return this.httpClient.post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDVpcwt6pZSvru2kSO-EVoV-GSEBwL6RI',
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

    private handleAuthResponse(
      email: string,
      userId: string,
      idToken: string,
      expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, idToken, expirationDate);
        this.user.next(user);
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
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
        }
        return throwError(errorMessage);
    }
}

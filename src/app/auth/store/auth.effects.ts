import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";
import * as AuthActions from "./auth.actions";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	resfreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;  // declared as optional bcz we need this in login method and not in signup
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
	const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
	const user = new User(email, userId, token, expirationDate);
	localStorage.setItem('userData', JSON.stringify(user));
	return AuthActions.authenticateSuccess({
		email: email,
		userId: userId,
		token: token,
		expirationDate: expirationDate,
		redirect: true
	});
}

const handleError = (errorRes: any) => {
	let errorMessage = 'An unknown error occurred!';
	if (!errorRes.error || !errorRes.error.error) {
		return of(AuthActions.authenticateFail({ error: errorMessage }));
	}
	switch (errorRes.error.error.message) {
		case 'EMAIL_EXISTS':
			errorMessage = 'This email already exist.';
			break;
		case 'EMAIL_NOT_FOUND':
			errorMessage = 'This email does not exist.';
			break;
		case 'INVALID_PASSWORD':
			errorMessage = 'This password is incorrect.';
			break;
	}
	return of(AuthActions.authenticateFail({ error: errorMessage }));
}

@Injectable()
export class AuthEffects {
	authSignup = createEffect(() =>
		this.actions$
			.pipe(
				ofType(AuthActions.signupStart),
				switchMap(action => {
					return this.http.post<AuthResponseData>(
						'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
						{
							email: action.email,
							password: action.password,
							returnSecureToken: true
						}
					)
						.pipe(
							tap(resData => {
								this.authService.setAutoLogoutTimer(+resData.expiresIn * 1000);
							}),
							map(resData => {
								return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
							}),
							catchError(errorRes => {
								return handleError(errorRes);
							}),
						);
				})
			)
	);

	authLogin = createEffect(() =>
		this.actions$
			.pipe(
				ofType(AuthActions.loginStart),
				switchMap(action => {
					return this.http
						.post<AuthResponseData>(
							'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
							{
								email: action.email,
								password: action.password,
								returnSecureToken: true
							}
						)
						.pipe(
							tap(resData => {
								this.authService.setAutoLogoutTimer(+resData.expiresIn * 1000);
							}),
							map(resData => {
								return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
							}),
							catchError(errorRes => {
								return handleError(errorRes);
							}),
						);
				})
			)
	);

	autoLogin = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.autoLogin),
			map(() => {
				const userData: {
					email: string;
					id: string;
					_token: string;
					_tokenExpirationDate: string;
				} = JSON.parse(localStorage.getItem('userData'));
				if (!userData) {
					return { type: 'DUMMY' };
				}

				const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

				if (loadedUser.token) {
					const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

					// this.user.next(loadedUser);
					this.authService.setAutoLogoutTimer(expirationDuration);
					return AuthActions.authenticateSuccess({
						email: loadedUser.email,
						userId: loadedUser.id,
						token: loadedUser.token,
						expirationDate: new Date(userData._tokenExpirationDate),
						redirect: false
					});

					// this.autoLogout(expirationDuration);
				}
				return { type: 'DUMMY' };
			})
		)
	)

	authRedirect = createEffect(() =>
		this.actions$
			.pipe(
				ofType(AuthActions.authenticateSuccess),
				tap(action => {
					if (action.redirect) {
						this.router.navigate(['/']); 
					}
				})
			),
		{
			dispatch: false
		}
	);

	authLogout = createEffect(() =>
		this.actions$
			.pipe(
				ofType(AuthActions.logout),
				tap(() => {
					this.authService.clearAutoLogoutTimer();
					localStorage.removeItem('userData');
					this.router.navigate(['/auth']);
				})
			),
		{
			dispatch: false
		}
	)

	constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) { }
}


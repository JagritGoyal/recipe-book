import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Store } from "@ngrx/store";

import { User } from "./user.model";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

// export interface AuthResponseData {
// 	kind: string;
// 	idToken: string;
// 	email: string;
// 	resfreshToken: string;
// 	expiresIn: string;
// 	localId: string;
// 	registered?: boolean;  // declared as optional bcz we need this in login method and not in signup
// }

@Injectable({ providedIn: 'root' })

export class AuthService {
	// user = new BehaviorSubject<User>(null);

	private tokenExpirationDuration: any;

	constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

	// signup(email: string, password: string) {
	// 	return this.http.post<AuthResponseData>(
	// 		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
	// 		{
	// 			email: email,
	// 			password: password,
	// 			returnSecureToken: true
	// 		}
	// 	).pipe(
	// 		catchError(this.handleError),
	// 		tap(
	// 			responseData => {
	// 				this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
	// 			}
	// 		)
	// 	);
	// }

	// login(email: string, password: string) {
	// 	return this.http.post<AuthResponseData>(
	// 		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
	// 		{
	// 			email: email,
	// 			password: password,
	// 			returnSecureToken: true
	// 		}
	// 	).pipe(
	// 		catchError(this.handleError),
	// 		tap(
	// 			responseData => {
	// 				this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
	// 			}
	// 		)
	// 	);
	// }

	// autoLogin() {
	// 	const userData: {
	// 		email: string;
	// 		id: string;
	// 		_token: string;
	// 		_tokenExpirationDate: string;
	// 	} = JSON.parse(localStorage.getItem('userData'));
	// 	if (!userData) {
	// 		return;
	// 	}

	// 	const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

	// 	if (loadedUser.token) {
	// 		// this.user.next(loadedUser);

	// 		this.store.dispatch(AuthActions.authenticateSuccess({ 
	// 			email: loadedUser.email, 
	// 			userId: loadedUser.id, 
	// 			token: loadedUser.token, 
	// 			expirationDate: new Date(userData._tokenExpirationDate)
	// 		}));

	// 		const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
	// 		this.autoLogout(expirationDuration);
	// 	}
	// }

	// logout() {
	// 	// this.user.next(null);
	// 	// this.store.dispatch(AuthActions.logout()),
	// 	// this.router.navigate(['/auth']);
	// 	localStorage.removeItem('userData');
	// 	if (this.tokenExpirationDuration) {
	// 		clearTimeout(this.tokenExpirationDuration)
	// 	}
	// 	this.tokenExpirationDuration = null;
	// }

	setAutoLogoutTimer(expirationDuration: number) {
		console.log(expirationDuration);

		this.tokenExpirationDuration = setTimeout(() => {
			// this.logout();
			this.store.dispatch(AuthActions.logout());
		}, expirationDuration);
	}

	clearAutoLogoutTimer() {
		if(this.tokenExpirationDuration) {
			clearTimeout(this.tokenExpirationDuration);
			this.tokenExpirationDuration = null;
		}
	}

	// private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
	// 	const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
	// 	const user = new User(email, userId, token, expirationDate);
	// 	// this.user.next(user);

	// 	this.store.dispatch(AuthActions.authenticateSuccess({email: email, userId: userId, token: token, expirationDate: expirationDate}))

	// 	this.autoLogout(expiresIn * 1000);
	// 	localStorage.setItem('userData', JSON.stringify(user));
	// }

	// private handleError(errorRes: HttpErrorResponse) {
	// 	let errorMessage = 'An unknown error occurred!';
	// 	if (!errorRes.error || !errorRes.error.error) {
	// 		return throwError(errorMessage);
	// 	}
	// 	switch (errorRes.error.error.message) {
	// 		case 'EMAIL_EXISTS':
	// 			errorMessage = 'This email already exist.';
	// 			break;
	// 		case 'EMAIL_NOT_FOUND':
	// 			errorMessage = 'This email does not exist.';
	// 			break;
	// 		case 'INVALID_PASSWORD':
	// 			errorMessage = 'This password is incorrect.';
	// 			break;
	// 	}
	// 	return throwError(errorMessage);
	// }
}
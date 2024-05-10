import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";

export const signupStart = createAction(
	'[Auth] signupStart',
	props<{ email: string, password: string }>()
)

export const loginStart = createAction(
	'[Auth] loginStart',
	props<{ email: string, password: string }>()
);

export const authenticateSuccess = createAction(
	'[Auth] authenticateSuccess',
	props<{ email: string, userId: string, token: string, expirationDate: Date, redirect: boolean }>()
);

export const autoLogin = createAction(
	'[Auth] autoLogin'
)

export const authenticateFail = createAction(
	'[Auth] authenticateFail',
	props<{ error: string }>()
);

export const clearError = createAction(
	'[Auth] clearError'
);

export const logout = createAction(
	'[Auth] logout'
);
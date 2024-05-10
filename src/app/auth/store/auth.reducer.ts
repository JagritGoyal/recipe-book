import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
	user: User;
	authError: string;
	loading: boolean;
}

const initialState: State = {
	user: null,
	authError: null,
	loading: false
};

export const authReducer = createReducer(
	initialState,
	on(
		AuthActions.loginStart,
		AuthActions.signupStart,
		(currentState, action) => ({
			...currentState,
			authError: null,
			loading: true
		})
	),
	on(
		AuthActions.authenticateSuccess,
		(currentState, action) => {
			const user = new User(action.email, action.userId, action.token, action.expirationDate);
			return {
				...currentState,
				authError: null,
				user: user,
				loading: false
			}
		}
	),
	on(
		AuthActions.logout,
		(currentState, action) => ({
			...currentState,
			user: null
		})
	),
	on(
		AuthActions.authenticateFail,
		(currentState, action) => ({
			...currentState,
			user: null,
			authError: action.error,
			loading: false
		})
	),
	on(
		AuthActions.clearError,
		(currentState, action) => ({
			...currentState,
			authError: null
		})
	)
);
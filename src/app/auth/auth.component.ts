import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
	@ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
	isLoginMode = true;
	isLoading = false;
	email = '';
	error: string = null;
	private closeSub: Subscription;
	private storeSub: Subscription;

	constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

	ngOnInit(): void {
		this.storeSub = this.store.select('auth').subscribe(authState => {
			this.isLoading = authState.loading;
			this.error = authState.authError;
			if (this.error) {
				this.showErrorAlert(this.error);
			}
		});
	}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}


	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;   // only for the purpose if someone enables the submit button by browser developer tools
		}
		const email = form.value.email;
		const password = form.value.password;

		if (this.isLoginMode) {
			// authObs = this.authService.login(email, password);
			this.store.dispatch(AuthActions.loginStart({ email: email, password: password }));
		} else {
			// authObs = this.authService.signup(email, password);
			this.store.dispatch(AuthActions.signupStart({ email: email, password: password }));
		}


		// we can write a common subscribe method for both the modes because we are getting the same response in both the cases except in login are getting one extra property which we have declared as optional in the AuthResponseData interface i.e. registered
		// authObs.subscribe(
		// 	responseData => {
		// 		this.isLoading = false;
		// 		this.email = responseData.email;
		// 		console.log(responseData);
		// 		this.router.navigate(['/recipes']);
		// 	},
		// 	errorMessage => {
		// 		this.isLoading = false;
		// 		this.error = errorMessage;
		// 		this.showErrorAlert(errorMessage);
		// 		console.log(errorMessage);
		// 	}
		// );

		form.reset();
	}

	onClose() {
		// this.error = null;
		this.store.dispatch(AuthActions.clearError());
	}

	private showErrorAlert(message: string) {
		// const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();

		const componentRef = hostViewContainerRef.createComponent(AlertComponent);

		componentRef.instance.message = message;
		this.closeSub = componentRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear();
		});
	}

	ngOnDestroy(): void {
		if (this.closeSub)
			this.closeSub.unsubscribe();

		this.storeSub.unsubscribe();
	}
}
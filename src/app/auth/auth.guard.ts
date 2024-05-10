import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {

// 	constructor(private authService: AuthService, private router: Router) { }

// 	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
// 		return this.authService.user.pipe(
// 			map(
// 				user => {
// 					const isAuth = !!user;
// 					if(isAuth){
// 						return true; 
// 					}
// 					return this.router.createUrlTree(['auth']);
// 				}
// 			),
// 			// tap(isAuth => {
// 			// 	if(!isAuth){
// 			// 		this.router.navigate(['/auth'])
// 			// 	}
// 			// })
// 		);
// 	}
// }

export const authGuardFn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
	const router = inject(Router);
	const authService = inject(AuthService);
	const store = inject(Store<fromApp.AppState>);
	return store.select('auth').pipe(
		take(1),
		map(authState => {
			return authState.user;
		}),
		map(
			user => {
				const isAuth = !!user;
				if (isAuth) {
					return true;
				}
				return router.createUrlTree(['auth']);
			}
		)
	);
}
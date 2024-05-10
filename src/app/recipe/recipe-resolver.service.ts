import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs/operators";

import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "./store/recipe.actions";
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]>{
	constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, private store: Store<fromApp.AppState>, private actions$: Actions) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		// const recipes = this.recipeService.getRecipes();

		// if (recipes.length === 0) {
		// 	return this.dataStorageService.fetchRecipes();
		// } else {
		// 	return recipes;
		// }
		return this.store.select('recipes').pipe(
			take(1),
			map(recipesState => {
				return recipesState.recipes;
			}),
			switchMap(recipes => {
				if (recipes.length === 0) {
					this.store.dispatch(RecipesActions.fetchRecipes());
					return this.actions$.pipe(
						ofType('[Recipes] setRecipes'),
						take(1)
					);
				} else {
					return of(recipes);
				}
			})
		)

	}
}
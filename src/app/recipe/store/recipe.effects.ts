import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipesEffects {
	fetchRecipes = createEffect(() =>
		this.actions$.pipe(
			ofType(RecipesActions.fetchRecipes),
			switchMap(() => {
				return this.http
					.get<Recipe[]>(
						'https://course-recipe-book-27c41-default-rtdb.firebaseio.com/recipes.json'
					)
			}),
			map(recipes => {
				return recipes.map(recipe => {
					return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
				});
			}),
			map(recipes => {
				return RecipesActions.setRecipes({ recipe: recipes });
			})
		)
	)

	storeRecipes = createEffect(() =>
		this.actions$.pipe(
			ofType(RecipesActions.storeRecipes),
			withLatestFrom(this.store.select('recipes')),
			switchMap(([actionData, recipesState]) => {
				return this.http.put(
						'https://course-recipe-book-27c41-default-rtdb.firebaseio.com/recipes.json',
						recipesState.recipes
					)
			})
		),
		{
			dispatch: false
		}
	)

	constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
}
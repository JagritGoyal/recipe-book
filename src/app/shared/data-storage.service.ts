import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map, tap } from 'rxjs/operators';
import { Store } from "@ngrx/store";

import { RecipeService } from "../recipe/recipe.service";
import { Recipe } from "../recipe/recipe.model";
import { AuthService } from "../auth/auth.service";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "../recipe/store/recipe.actions";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
	// constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

	// storeRecipes() {
	// 	const recipes = this.recipeService.getRecipes();
	// 	this.http
	// 		.put(
	// 			'https://course-recipe-book-27c41-default-rtdb.firebaseio.com/recipes.json',
	// 			recipes
	// 		)
	// 		.subscribe(response => {
	// 			console.log(response);
	// 		});
	// }

	// fetchRecipes() {
	// 	return this.http
	// 		.get<Recipe[]>(
	// 			'https://course-recipe-book-27c41-default-rtdb.firebaseio.com/recipes.json'
	// 		).pipe(
	// 			map(recipes => {
	// 				return recipes.map(recipe => {
	// 					return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
	// 				});
	// 			}),
	// 			tap(recipes => {
	// 				// this.recipeService.setRecipes(recipes);
	// 				this.store.dispatch(RecipesActions.setRecipes({recipe: recipes}));
	// 			})
	// 		);
	// }
}
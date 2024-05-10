import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";

import * as ShoppingListActions from "./../shopping-list/store/shopping-list.actions"
import * as fromApp from "../store/app.reducer";
@Injectable()

export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();
	// recipeSelected = new EventEmitter<Recipe>();
	// recipeSelected = new Subject<Recipe>();

	// private recipes: Recipe[] = [
	// 	new Recipe(
	// 		'Pizza',
	// 		'Pizza - just awesome!',
	// 		'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/220px-Pizza-3007395.jpg',
	// 		[
	// 			new Ingredient('Bread', 1),
	// 			new Ingredient('Cheese', 2),
	// 		]),
	// 	new Recipe(
	// 		'Big Fat Burger',
	// 		'What else you need to say?',
	// 		'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/McDonald%27s_Quarter_Pounder_with_Cheese%2C_United_States.jpg/300px-McDonald%27s_Quarter_Pounder_with_Cheese%2C_United_States.jpg',
	// 		[
	// 			new Ingredient('Buns', 2),
	// 			new Ingredient('Patty', 1),
	// 		]),
	// ];

	private recipes: Recipe[] = [];

	constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) { }

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		// this.shoppingListService.addIngredients(ingredients);
		this.store.dispatch(ShoppingListActions.addIngredients({ ingredients: ingredients }))
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
}
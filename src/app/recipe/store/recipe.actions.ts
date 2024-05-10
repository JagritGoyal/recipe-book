import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const setRecipes = createAction(
	'[Recipes] setRecipes',
	props<{ recipe: Recipe[] }>()
);

export const fetchRecipes = createAction(
	'[Recipes] fetchRecipes'
);

export const storeRecipes = createAction(
	'[Recipes] storeRecipes'
);

export const addRecipe = createAction(
	'[Recipes] addRecipe',
	props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
	'[Recipes] updateRecipe',
	props<{ index: number, newRecipe: Recipe }>()
);

export const deleteRecipe = createAction(
	'[Recipes] deleteRecipe',
	props<{index: number}>()
);
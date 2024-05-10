import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";

export interface State {
	recipes: Recipe[];
}

const initialState: State = {
	recipes: []
}

export const recipeReducer = createReducer(
	initialState,
	on(
		RecipesActions.setRecipes,
		(currentState, action) => ({
			...currentState,
			recipes: [...action.recipe]
		})
	),
	on(
		RecipesActions.addRecipe,
		(currentState, action) => ({
			...currentState,
			recipes: [...currentState.recipes, action.recipe]
		})
	),
	on(
		RecipesActions.updateRecipe,
		(currentState, action) => {
			const updatedRecipe = { ...currentState.recipes[action.index], ...action.newRecipe };

			const updatedRecipes = [...currentState.recipes];
			updatedRecipes[action.index] = updatedRecipe;

			return {
				...currentState,
				recipes: updatedRecipes
			};
		}
	),
	on(
		RecipesActions.deleteRecipe,
		(currentState, action) => ({
			...currentState,
			recipes: currentState.recipes.filter((recipe, index) => {
				return index !== action.index;
			})
		})
	)
)
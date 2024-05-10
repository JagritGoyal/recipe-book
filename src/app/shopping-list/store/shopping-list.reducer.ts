import { createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";
import { addOrUpdateIngredient, addIngredients, deleteIngredient, updateIngredient, startEdit, stopEdit } from "./shopping-list.actions";

export interface State {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientIndex: number;
}

const initialState: State = {
	ingredients: [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 5),
		new Ingredient('Bread', 1),
		new Ingredient('Buns', 1),
	],
	editedIngredient: null,
	editedIngredientIndex: -1
};

export const shoppingListReducer = createReducer(
	initialState,
	// on(
	// 	addIngredient,
	// 	(currentState, action) =>
	// 	({
	// 		...currentState,
	// 		ingredients: [...currentState.ingredients, action.ingredient]
	// 	})
	// ),
	on(
		addOrUpdateIngredient,
		(currentState, action) => {
			const newIngredient = new Ingredient(action.ingredient.name, action.ingredient.amount);
			// const index = currentState.ingredients.findIndex(ing => ing.name === newIngredient.name);
			const index = currentState.editedIngredientIndex;
			if (index !== -1) { //got the index i.e. ing. alrdy exists so we update
				const oldIng = currentState.ingredients[index];
				newIngredient.amount += oldIng.amount;
				const updateIng = {
					...oldIng,
					...newIngredient
				};
				const updatedIngredients = [...currentState.ingredients];
				updatedIngredients[index] = updateIng;
				return {
					...currentState,
					ingredients: updatedIngredients,
					editedIngredientIndex: -1,
					editedIngredient: null
				}
			} else {  //got -1 index i.e. no such ing. exists so we add new one
				return {
					...currentState,
					ingredients: [...currentState.ingredients, newIngredient]
				}
			}
		}
	),
	on(
		addIngredients,
		(currentState, action) =>
		({
			...currentState,
			ingredients: [...currentState.ingredients, ...action.ingredients]
		})
	),
	// on(
	// 	updateIngredient,
	// 	(currentState, action) => {
	// 		const ingredient = currentState.ingredients[action.index];
	// 		const updateIng = {
	// 			...ingredient,
	// 			...action.ingredient
	// 		};
	// 		const updateIngredients = [...currentState.ingredients];
	// 		updateIngredients[action.index] = updateIng;
	// 		return {
	// 			...currentState,
	// 			ingredients: updateIngredients
	// 		}
	// 	}
	// ),
	on(
		deleteIngredient,
		(currentState, action) => ({
			...currentState,
			ingredients: currentState.ingredients.filter((ig, index) => {
				return index !== currentState.editedIngredientIndex;
			}),
			editedIngredientIndex: -1,
			editedIngredient: null
		})
	),
	on(
		startEdit,
		(currentState, action) => ({
			...currentState,
			editedIngredientIndex: action.index,
			editedIngredient: { ...currentState.ingredients[action.index]}
		})
	),
	on(
		stopEdit,
		(currentState, action) => ({
			...currentState,
			editedIngredientIndex: -1,
			editedIngredient: null
		})
	)
);
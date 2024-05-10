import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 5),
		new Ingredient('Bread', 1),
		new Ingredient('Buns', 1),
	];

	getIngredients() {
		return this.ingredients.slice();
	}
	getIngredient(index: number) {
		return this.ingredients[index];
	}

	addIngredient(ingredient: Ingredient) {
		// this.ingredients.push(ingredient);
		// this.ingredientsChanged.next(this.ingredients.slice());

		const index = this.ingredients.findIndex(ing => ing.name === ingredient.name)
		if(index === -1){
			this.ingredients.push(ingredient);
			this.ingredientsChanged.next(this.ingredients.slice());
		} else {
			this.ingredients[index].amount += ingredient.amount;
		}
	}
	addIngredients(ingredients: Ingredient[]) {
		// for(let ingredient of ingredients) {
		// 	this.addIngredient(ingredient);
		// }
		// this.ingredients.push(...ingredients);
		ingredients.forEach(ing => this.addIngredient(ing))
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	updateIngredient(index: number, newIngredient: Ingredient) {
		this.ingredients[index] = newIngredient;
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	// deleteIngredient(name: string) {
	// 	const index = this.ingredients.findIndex(ing => ing.name === name)
	// 	this.ingredients.splice(index,1);
	// 	this.ingredientsChanged.next(this.ingredients.slice());
	// }
	deleteIngredient(index: number) {
		// const index = this.ingredients.findIndex(ing => ing.name === name)
		this.ingredients.splice(index,1);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}
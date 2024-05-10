import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipeComponent } from "./recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [
		RecipeComponent,
		RecipeDetailComponent,
		RecipeEditComponent,
		RecipeListComponent,
		RecipeStartComponent,
		RecipeItemComponent
	],
	imports: [
		ReactiveFormsModule,
		RecipesRoutingModule,
		SharedModule
	]
})
export class RecipesModule {

}
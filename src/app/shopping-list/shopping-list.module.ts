import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { LoggingService } from "../logging.service";

@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent
	],
	imports: [
		FormsModule,
		ShoppingListRoutingModule,
		SharedModule
	],
	// providers: [LoggingService]
})
export class ShoppingListModule {}
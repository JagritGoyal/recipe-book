import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // page = 'recipes';
  // // page = 'shopping-list';

  // onPageLoad(page: string) {
  //   this.page = page;    
  // }

  constructor(private authService: AuthService, private loggingService: LoggingService, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(AuthActions.autoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}

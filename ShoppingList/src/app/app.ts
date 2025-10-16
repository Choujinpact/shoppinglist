// src/app/app.component.ts
import { Component } from '@angular/core';
import { ShoppingListComponent } from './ShoppingListComponent/ShoppingListComponent';

@Component({
  selector: 'app-root',
  imports: [ShoppingListComponent],
  template: `
    <app-shopping-list></app-shopping-list>
  `
})
export class AppComponent {}
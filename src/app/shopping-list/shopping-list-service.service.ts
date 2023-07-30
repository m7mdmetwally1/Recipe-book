import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/Ingredients';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListServiceService {
  constructor() {}

  ingridientsChanged = new Subject<Ingredients[]>();
  editItemIndex = new Subject<number>();

  ingredients: Ingredients[] = [
    new Ingredients('apples', 5),
    new Ingredients('banana', 4),
  ];

  getIngridientsByIndex(index: number) {
    return this.ingredients[index];
  }

  getIngridients() {
    return this.ingredients.slice();
  }

  addIngridient(name: string, amount: number) {
    this.ingredients.push(new Ingredients(name, amount));
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  updateIngridient(index: number, ingredient: Ingredients) {
    this.ingredients[index] = ingredient;
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  deleteIngridient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingridientsChanged.next(this.ingredients.slice());
  }
}

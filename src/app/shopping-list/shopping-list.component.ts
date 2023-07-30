import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/Ingredients';
import { ShoppingListServiceService } from './shopping-list-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[];

  constructor(private shoppingService: ShoppingListServiceService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngridients();
    this.shoppingService.ingridientsChanged.subscribe((ingridients) => {
      this.ingredients = ingridients;
    });
  }

  editItem(index: number) {
    console.log(index);

    this.shoppingService.editItemIndex.next(index);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingListServiceService } from '../shopping-list-service.service';
import { Ingredients } from '../../shared/Ingredients';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  itemNumber: number;
  itemEdeted: Ingredients;
  subscription: Subscription;
  editMode = false;
  constructor(private shopService: ShoppingListServiceService) {}

  ngOnInit() {
    this.subscription = this.shopService.editItemIndex.subscribe(
      (index: number) => {
        this.itemNumber = index;
        this.editMode = true;
        this.itemEdeted = this.shopService.getIngridientsByIndex(index);
        this.slForm.setValue({
          name: this.itemEdeted.name,
          amount: this.itemEdeted.amount,
        });
      }
    );
  }

  addUpdateIngrideients(form: NgForm) {
    const value = form.value;

    if (this.editMode) {
      this.shopService.updateIngridient(
        this.itemNumber,
        new Ingredients(value.name, value.amount)
      );
      this.editMode = false;
      this.slForm.resetForm();
    } else {
      this.shopService.addIngridient(value.name, value.amount);
      this.slForm.resetForm();
    }
  }

  onClear() {
    this.slForm.resetForm();
    this.editMode = false;
  }

  onDelete() {
    this.shopService.deleteIngridient(this.itemNumber);
    this.onClear();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

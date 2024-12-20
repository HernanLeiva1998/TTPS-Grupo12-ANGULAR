import { Component, OnInit } from '@angular/core';
import { SubmitButtonComponent } from '../../../components/submit-button/submit-button.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { RequiredMarkDirective } from '../../../directives/required-mark.directive';
import { AlertComponent } from '../../../components/alert/alert.component';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';
import { ConsumableService } from '../../../services/consumable/consumable.service';
import { MenuService } from '../../../services/menu/menu.service';
import { Menu } from '../../../models/menu';
import { Consumable } from '../../../models/consumable';

@Component({
  selector: 'app-new-menu',
  standalone: true,
  imports: [
    AlertComponent,
    RequiredMarkDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonComponent,
  ],
  templateUrl: './new-menu.component.html',
  styleUrl: './new-menu.component.css'
})
export class NewMenuComponent implements OnInit {
  form: FormGroup;
  consumables: Consumable[];
  submitButtonLoading: Boolean;
  foodType: string = 'NONE';

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private readonly router: Router,
    private alertService: AlertService,
    private menuService: MenuService,
    private consumableService: ConsumableService
  ) {
    this.submitButtonLoading = false;
    this.form = new FormGroup({});
    this.consumables = [];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      foodType: ['', [Validators.required]],
      appetizer: ['', [Validators.required]],
      mainCourse: ['', [Validators.required]],
      dessert: ['', [Validators.required]],
      drink: ['', [Validators.required]],
    });
    this.getAll();
    this.onFoodTypeChange();
  }

  create(): void {
    this.submitButtonLoading = true;
    const menu: Menu = {
      name: this.form.value.name,
      price: this.form.value.price,
      type: this.form.value.foodType,
      consumables: [this.form.value.appetizer, this.form.value.mainCourse, this.form.value.dessert, this.form.value.drink]
    };
    this.menuService.create(menu).subscribe({
      next: () => {
        this.router.navigate(['menu']);
      },
      error: (error) => {
        this.submitButtonLoading = false;
        this.alertService.error(error.message);
      },
    });
  }

  getAll() {
    this.consumableService.getAll().subscribe({
      next: (data: Consumable[]) => {
        this.consumables = data;
      },
      error: (error) => {
        this.alertService.error(error.message);
      },
    });
  }

  onFoodTypeChange(): void {
    this.form.get('foodType')?.valueChanges.subscribe((value) => {
      this.foodType = value;
    });
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  /* 
  modifyContent(Consumable c, String type){
    if (c.category === type){
    return true
    }
    return true;
  }
    */

}

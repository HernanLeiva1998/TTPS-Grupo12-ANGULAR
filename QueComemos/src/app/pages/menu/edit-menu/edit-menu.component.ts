import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../../../components/alert/alert.component';
import { RequiredMarkDirective } from '../../../directives/required-mark.directive';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubmitButtonComponent } from '../../../components/submit-button/submit-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumableService } from '../../../services/consumable/consumable.service';
import { AlertService } from '../../../services/alert/alert.service';
import { MenuService } from '../../../services/menu/menu.service';
import { Menu } from '../../../models/menu';
import { Consumable } from '../../../models/consumable';

@Component({
  selector: 'app-edit-menu',
  standalone: true,
  imports: [
    AlertComponent,
    RequiredMarkDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonComponent,
  ],
  templateUrl: './edit-menu.component.html',
  styleUrl: './edit-menu.component.css'
})
export class EditMenuComponent implements OnInit {
  form: FormGroup;
  submitButtonLoading: Boolean;
  consumables : Consumable [];
  menu: Menu;
  idMenu: number;
  foodType: string = 'NONE';

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuService: MenuService,
    private alertService: AlertService,
    private consumableService: ConsumableService
  ) {
    this.idMenu = this.activatedRoute.snapshot.params['id'];
    this.form = new FormGroup({});
    this.submitButtonLoading = false;
    this.menu = {
      name: '',
      price: 0,
      type: '',
      consumables: [],
    };
    this.consumables = [];
  }

  ngOnInit(): void {
    this.fetchMenu();
    this.initializeForm();
    this.getAll();
    this.onFoodTypeChange();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      foodType: ['', [Validators.required]],
      appetizer: ['', [Validators.required]],
      mainCourse: ['', [Validators.required]],
      dessert: ['', [Validators.required]],
      drink: ['', [Validators.required]],
    });
  }

  fetchMenu(): void {
    this.menuService.getMenu(this.idMenu).subscribe({
      next: (data: Menu) => {
        this.menu = data;
        this.form.get('name')?.setValue(data.name);
        this.form.get('foodType')?.setValue(data.type);
        this.form.get('price')?.setValue(data.price);
        this.form.get('appetizer')?.setValue(data.consumables?.find(c => c.category === 'APPETIZER'));
        this.form.get('mainCourse')?.setValue(data.consumables?.find(c => c.category === 'MAIN_COURSE'));
        this.form.get('dessert')?.setValue(data.consumables?.find(c => c.category === 'DESSERT'));
        this.form.get('drink')?.setValue(data.consumables?.find(c => c.category === 'DRINK'));
      },
      error: (error) => {
        this.alertService.error(error.message);
      },
    });
  }

  update(): void {
    this.submitButtonLoading = true;
    this.menu.name = this.form.value.name;
    this.menu.price = this.form.value.price;
    this.menu.type = this.form.value.foodType;
    this.consumables = [
      this.form.value.appetizer,
      this.form.value.mainCourse,
      this.form.value.dessert,
      this.form.value.drink,
    ],
    this.menu.consumables = this.consumables;

    this.menuService.update(this.menu).subscribe({
      next: () => {
        this.router.navigate(['menu']);
      },
      error: (error) => {
        this.submitButtonLoading = false;
        this.alertService.error(error.message);
      },
    });
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

    getAll(){
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

}

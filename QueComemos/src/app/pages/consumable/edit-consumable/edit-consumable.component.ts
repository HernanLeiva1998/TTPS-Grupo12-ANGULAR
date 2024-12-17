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
import { Consumable } from '../../../models/consumable';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumableService } from '../../../services/consumable/consumable.service';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-edit-consumable',
  standalone: true,
  imports: [
    AlertComponent,
    RequiredMarkDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonComponent,
  ],
  templateUrl: './edit-consumable.component.html',
  styleUrl: './edit-consumable.component.css',
})
export class EditConsumableComponent implements OnInit {
  form: FormGroup;
  submitButtonLoading: Boolean;
  consumable: Consumable;
  idConsumable: number;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private consumableService: ConsumableService,
    private alertService: AlertService
  ) {
    this.idConsumable = this.activatedRoute.snapshot.params['id'];
    this.form = new FormGroup({});
    this.submitButtonLoading = false;
    this.consumable = {
      name: '',
      description: '',
      price: 0,
      category: '',
      foodType: '',
    };
  }

  ngOnInit(): void {
    this.fetchConsumable();
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      foodType: ['', [Validators.required]],
    });
  }

  fetchConsumable(): void {
    this.consumableService.getConsumable(this.idConsumable).subscribe({
      next: (data) => {
        console.log(data);
        this.form.get('name')?.setValue(data.name);
        this.form.get('description')?.setValue(data.description);
        this.form.get('price')?.setValue(data.price);
        this.form.get('category')?.setValue(data.category);
        this.form.get('foodType')?.setValue(data.foodType);
        this.consumable = data;
      },
      error: (error) => {
        this.alertService.error(error.message);
      },
    });
  }

  update(): void {
    this.submitButtonLoading = true;
    this.consumable.name = this.form.value.name;
    this.consumable.description = this.form.value.description;
    this.consumable.price = this.form.value.price;
    this.consumable.category = this.form.value.category;
    this.consumable.foodType = this.form.value.foodType;

    this.consumableService.update(this.consumable).subscribe({
      next: () => {
        this.router.navigate(['consumable']);
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
}

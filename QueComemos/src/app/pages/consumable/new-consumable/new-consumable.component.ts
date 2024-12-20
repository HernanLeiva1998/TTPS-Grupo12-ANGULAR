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
import { Consumable } from '../../../models/consumable';

@Component({
  selector: 'app-new-consumable',
  standalone: true,
  imports: [
    AlertComponent,
    RequiredMarkDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonComponent,
  ],
  templateUrl: './new-consumable.component.html',
  styleUrl: './new-consumable.component.css',
})
export class NewConsumableComponent implements OnInit {
  form: FormGroup;
  submitButtonLoading: Boolean;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private readonly router: Router,
    private alertService: AlertService,
    private consumableService: ConsumableService
  ) {
    this.submitButtonLoading = false;
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      foodType: ['', [Validators.required]],
    });
  }

  create(): void {
    this.submitButtonLoading = true;
    const consumable: Consumable = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      category: this.form.value.category,
      foodType: this.form.value.foodType,
    };
    this.consumableService.create(consumable).subscribe({
      next: () => {
        this.router.navigate(['consumable']);
      },
      error: (error) => {
        this.submitButtonLoading = false;
        this.alertService.error(error.message);
      },
    });
  }

  onlyShowNone() {
    return this.form.value.category == 'DRINK'
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}

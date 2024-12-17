import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../../components/alert/alert.component';
import { RequiredMarkDirective } from '../../directives/required-mark.directive';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';
import { User } from '../../models/user';
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AlertComponent,
    RequiredMarkDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitButtonLoading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      repeatedPassword: ['', [Validators.required]],
      firstname: ['', []],
      lastname: ['', []],
    });
  }

  public onRegister(): void {
    this.submitButtonLoading = true;
    if (this.form.value.password != this.form.value.repeatedPassword) {
      this.alertService.error(
        'Las contraseñas proporcionadas deben coincidir.'
      );
    } else {
      var user: User = {
        email: this.form.value.email,
        password: this.form.value.password,
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        role: 'USER',
      };
      this.userService.create(user).subscribe({
        next: (data) => {
          this.alertService.success("Ya puede ingresar al sistema.");
        },
        error: (error) => {
          this.alertService.error(error.message);
        },
      });
    }
    this.submitButtonLoading = false;
  }
}

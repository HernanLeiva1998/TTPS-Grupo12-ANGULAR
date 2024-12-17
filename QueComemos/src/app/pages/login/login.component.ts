import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { SessionService } from '../../services/session/session.service';
import { AlertService } from '../../services/alert/alert.service';
import { TokenService } from '../../services/token/token.service';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private tokenService: TokenService,
    private sessionService: SessionService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.tokenService.logOut();
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public onLogin(): void {
    var user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.login(user).subscribe({
      next: (data) => {
        this.sessionService.setRole(data?.json.role!!);
        this.router.navigate(['home']);
      },
      error: (error) => {
        this.alertService.error(error.message);
      },
    });
  }
}

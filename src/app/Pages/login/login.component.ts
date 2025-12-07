import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../Services/Auth';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  constructor(private authService: AuthService, private route: Router) {}

  onSubmit() {
    if (this.login.invalid) {
      this.login.markAllAsTouched();
      return;
    }
    this.authService.login(
      this.login.value.email!,
      this.login.value.password!
    ).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        localStorage.setItem('token', res.token);
        this.route.navigate(['/test']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}

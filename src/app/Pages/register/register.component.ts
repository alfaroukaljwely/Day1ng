import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Auth';
import { PasswordMatch } from '../../customValidators/PasswordMatch';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  register = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    re_password: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(10)])
  },{validators: PasswordMatch});

  constructor(private authService: AuthService, private route : Router) {}

  submit() {
    if (this.register.invalid) {
      this.register.markAllAsTouched();
      return;
    }
    this.authService.register(
      this.register.value.name!,
      this.register.value.email!,
      this.register.value.password!,
      this.register.value.re_password!,
      Number(this.register.value.age!)
    ).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        this.route.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }
}

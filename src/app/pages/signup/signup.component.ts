import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService, UserData } from '../../shared/service/app/app.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  contactForm: FormGroup;
  signUpForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private appService: AppService, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.contactForm.value)
  }

  // signUp() {
  //   const name = (document.getElementById('name') as HTMLInputElement).value;
  //   const email = (document.getElementById('email') as HTMLInputElement).value;
  //   const password = (document.getElementById('password') as HTMLInputElement).value;
  //   const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

  //   let isValid = true;

  //   // Validation logic
  //   if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
  //     this.displayError('name', 'Please enter a valid name with only alphabetic characters');
  //     isValid = false;
  //   } else this.clearError('name');

  //   if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
  //     this.displayError('email', 'Please enter a valid email address');
  //     isValid = false;
  //   } else this.clearError('email');

  //   if (!password || password.length < 6 || !/[!@#$%^&*]/.test(password) || !/\d/.test(password)) {
  //     this.displayError('password', 'Password must be at least 6 characters with a number and special character');
  //     isValid = false;
  //   } else this.clearError('password');

  //   if (confirmPassword !== password) {
  //     this.displayError('confirm-password', 'Passwords do not match');
  //     isValid = false;
  //   } else this.clearError('confirm-password');

  //   if (isValid) {
  //     console.log('Form submitted successfully');
  //   }
  // }

  signUp() {
    console.log(this.signUpForm.value);
    const payload: UserData = {
      email: this.signUpForm.value.email,
      name: this.signUpForm.value.name,
      password: this.signUpForm.value.password
    }
    this.appService.register(payload).subscribe(res => {
      console.log(res);
      this.router.navigate(['/login']);
      this.snackBar.open(`${payload.name} has registered successfully`, 'close', {
        duration:0,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
    }, err => {
      this.snackBar.open(err.error.error, 'close', {
        duration:0,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      console.log(err.error.error);
    })
  }
  displayError(id: string, message: string) {
    const errorDiv = document.getElementById(`${id}-error`);
    if (errorDiv) errorDiv.textContent = message;
  }

  clearError(id: string) {
    const errorDiv = document.getElementById(`${id}-error`);
    if (errorDiv) errorDiv.textContent = '';
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Replace '/login' with the actual route to the login page
  }

  subscribe(event: Event) {
    event.preventDefault();
    console.log('Subscribed to newsletter');
  }
}

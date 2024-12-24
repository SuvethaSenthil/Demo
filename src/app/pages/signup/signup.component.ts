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
    this.router.navigate(['/login']); 
  }

  subscribe(event: Event) {
    event.preventDefault();
    console.log('Subscribed to newsletter');
  }
}

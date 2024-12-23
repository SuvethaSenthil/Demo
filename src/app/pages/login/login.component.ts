import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppService, LoginData } from '../../shared/service/app/app.service';
import { TokenService } from '../../shared/service/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  forgotPasswordContainer: boolean = false;
  otpVerificationContainer: boolean = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private tokenService: TokenService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logIn() {
    if (this.loginForm.valid) {
      console.log('Form Value:', this.loginForm.value);
      const payload: LoginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.appService.login(payload).subscribe((res: any) => {
        console.log("Successful response value is : ", res.token);
        this.router.navigate(['/dashboard']);
        /**
         *  set the token value from the response after API call.
         * Here for example I mentioned as res.token assign the actual token here.
         */
        this.tokenService.setToken(res.token);
      }, err => {
        console.log("Handled the error logic here");
      })
    } else {
      console.log('Form is invalid');
    }
  }
  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required.';
    } else if (emailControl?.hasError('email')) {
      return 'Please enter a valid email.';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required.';
    } else if (passwordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    return passwordRegex.test(password);
  }

  showError(elementId: string, message: string) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) errorElement.innerText = message;
  }

  hideError(elementId: string) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) errorElement.innerText = '';
  }

  showForgotPasswordModal(event: Event) {
    event.preventDefault();
    this.forgotPasswordContainer = true;
    this.otpVerificationContainer = false;
  }

  sendOtp() {
    const email = (document.getElementById('forgot-email') as HTMLInputElement)?.value;
    if (this.validateEmail(email)) {
      alert('OTP sent successfully');
      this.showOtpVerification();
    } else {
      alert('Please enter a valid email');
    }
  }

  showOtpVerification() {
    this.otpVerificationContainer = true;
    this.forgotPasswordContainer = false;
  }

  verifyOtp() {
    alert('OTP verified successfully');
  }
}

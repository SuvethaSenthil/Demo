import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports:[CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  forgotPasswordContainer: boolean = false;
  otpVerificationContainer: boolean = false;

  logIn() {
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)?.value;
    let isValid = true;

    if (!email) {
      this.showError('email-error', 'Email is required');
      isValid = false;
    } else if (!this.validateEmail(email)) {
      this.showError('email-error', 'Enter a valid email address');
      isValid = false;
    } else {
      this.hideError('email-error');
    }

    if (!password) {
      this.showError('password-error', 'Password is required');
      isValid = false;
    } else if (!this.validatePassword(password)) {
      this.showError('password-error', 'Password must be at least 6 characters with a number and a special symbol');
      isValid = false;
    } else {
      this.hideError('password-error');
    }

    if (isValid) {
      alert('Login successful!');
    }
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

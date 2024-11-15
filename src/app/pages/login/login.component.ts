import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: '',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private forgotPasswordContainer: HTMLElement | null = null;
  private otpVerificationContainer: HTMLElement | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.createLoginHTML();
  }

  createLoginHTML() {
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'container');

    const brandLogo = this.renderer.createElement('div');
    this.renderer.addClass(brandLogo, 'brand-logo');
    this.renderer.appendChild(container, brandLogo);

    const brandTitle = this.renderer.createElement('div');
    this.renderer.addClass(brandTitle, 'brand-title');
    this.renderer.setProperty(brandTitle, 'innerText', 'Log In');
    this.renderer.appendChild(container, brandTitle);

    const inputsDiv = this.renderer.createElement('div');
    this.renderer.addClass(inputsDiv, 'inputs');

    this.createInputLabel(inputsDiv, 'Email', 'email', 'email', 'yourname@example.com');
    this.createErrorMessage(inputsDiv, 'email-error');

    this.createInputLabel(inputsDiv, 'Password', 'password', 'password', 'Your Password');
    this.createErrorMessage(inputsDiv, 'password-error');

    const loginButton = this.renderer.createElement('button');
    this.renderer.listen(loginButton, 'click', () => this.logIn());
    this.renderer.setProperty(loginButton, 'innerText', 'Log In');
    this.renderer.appendChild(inputsDiv, loginButton);

    this.renderer.appendChild(container, inputsDiv);

    const forgotPasswordSection = this.renderer.createElement('div');
    this.renderer.addClass(forgotPasswordSection, 'forgot-password-section');
    const forgotPasswordLink = this.renderer.createElement('a');
    this.renderer.setAttribute(forgotPasswordLink, 'href', '#');
    this.renderer.setProperty(forgotPasswordLink, 'innerText', 'Forgot Password?');
    this.renderer.listen(forgotPasswordLink, 'click', (event) => {
      event.preventDefault();
      this.showForgotPasswordModal();
    });
    this.renderer.appendChild(forgotPasswordSection, forgotPasswordLink);
    this.renderer.appendChild(container, forgotPasswordSection);

    const signupLinkDiv = this.renderer.createElement('div');
    this.renderer.addClass(signupLinkDiv, 'signup-link');
    const signupText = this.renderer.createElement('p');
    this.renderer.setProperty(signupText, 'innerHTML', `Don't have an account? <a href="signup">Sign Up</a>`);
    this.renderer.appendChild(signupLinkDiv, signupText);
    this.renderer.appendChild(container, signupLinkDiv);

    this.renderer.appendChild(this.el.nativeElement, container);
  }

  createInputLabel(parent: HTMLElement, labelText: string, inputType: string, inputId: string, placeholder: string) {
    const label = this.renderer.createElement('label');
    this.renderer.setProperty(label, 'innerText', labelText);
    this.renderer.appendChild(parent, label);

    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'type', inputType);
    this.renderer.setAttribute(input, 'placeholder', placeholder);
    this.renderer.setAttribute(input, 'id', inputId);
    this.renderer.appendChild(parent, input);
  }

  createErrorMessage(parent: HTMLElement, errorId: string) {
    const errorMessage = this.renderer.createElement('div');
    this.renderer.addClass(errorMessage, 'error-message');
    this.renderer.setAttribute(errorMessage, 'id', errorId);
    this.renderer.appendChild(parent, errorMessage);
  }

  showForgotPasswordModal() {
    if (this.forgotPasswordContainer) return;

    this.forgotPasswordContainer = this.renderer.createElement('div');
    this.renderer.addClass(this.forgotPasswordContainer, 'forgot-password-container');

    const forgotEmailLabel = this.renderer.createElement('label');
    this.renderer.setProperty(forgotEmailLabel, 'innerText', 'Enter your email:');
    this.renderer.appendChild(this.forgotPasswordContainer, forgotEmailLabel);

    const forgotEmailInput = this.renderer.createElement('input');
    this.renderer.setAttribute(forgotEmailInput, 'type', 'email');
    this.renderer.setAttribute(forgotEmailInput, 'id', 'forgot-email');
    this.renderer.setAttribute(forgotEmailInput, 'placeholder', 'Email');
    this.renderer.appendChild(this.forgotPasswordContainer, forgotEmailInput);

    const sendOtpButton = this.renderer.createElement('button');
    this.renderer.setProperty(sendOtpButton, 'innerText', 'Send OTP');
    this.renderer.listen(sendOtpButton, 'click', () => this.sendOtp());
    this.renderer.appendChild(this.forgotPasswordContainer, sendOtpButton);

    this.renderer.appendChild(this.el.nativeElement, this.forgotPasswordContainer);
  }

  logIn() {
    const email = (this.el.nativeElement.querySelector('#email') as HTMLInputElement).value;
    const password = (this.el.nativeElement.querySelector('#password') as HTMLInputElement).value;
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
    const errorElement = this.el.nativeElement.querySelector(`#${elementId}`);
    if (errorElement) {
      this.renderer.setProperty(errorElement, 'innerText', message);
    }
  }

  hideError(elementId: string) {
    const errorElement = this.el.nativeElement.querySelector(`#${elementId}`);
    if (errorElement) {
      this.renderer.setProperty(errorElement, 'innerText', '');
    }
  }

  sendOtp() {
    const email = (this.el.nativeElement.querySelector('#forgot-email') as HTMLInputElement).value;
    if (this.validateEmail(email)) {
      alert('OTP sent successfully');
      this.showOtpVerification();
    } else {
      alert('Please enter a valid email');
    }
  }

  showOtpVerification() {
    if (this.otpVerificationContainer) return;

    this.otpVerificationContainer = this.renderer.createElement('div');
    this.renderer.addClass(this.otpVerificationContainer, 'otp-verification-container');

    const otpLabel = this.renderer.createElement('label');
    this.renderer.setProperty(otpLabel, 'innerText', 'Enter OTP:');
    this.renderer.appendChild(this.otpVerificationContainer, otpLabel);

    const otpInput = this.renderer.createElement('input');
    this.renderer.setAttribute(otpInput, 'type', 'text');
    this.renderer.setAttribute(otpInput, 'id', 'otp-input');
    this.renderer.setAttribute(otpInput, 'placeholder', 'OTP');
    this.renderer.appendChild(this.otpVerificationContainer, otpInput);

    const verifyOtpButton = this.renderer.createElement('button');
    this.renderer.setProperty(verifyOtpButton, 'innerText', 'Verify OTP');
    this.renderer.listen(verifyOtpButton, 'click', () => this.verifyOtp());
    this.renderer.appendChild(this.otpVerificationContainer, verifyOtpButton);

    this.renderer.appendChild(this.el.nativeElement, this.otpVerificationContainer);
  }

  verifyOtp() {
    alert('OTP verified successfully');
  }
}

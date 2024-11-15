import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  template: '',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private renderer: Renderer2, private elRef: ElementRef, private router: Router) {}

  ngOnInit() {
    // Create container div
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'container');

    // Create logo
    const logo = this.renderer.createElement('div');
    this.renderer.addClass(logo, 'brand-logo');
    this.renderer.appendChild(container, logo);

    // Title
    const title = this.renderer.createElement('div');
    this.renderer.addClass(title, 'brand-title');
    const titleText = this.renderer.createText('Sign Up');
    this.renderer.appendChild(title, titleText);
    this.renderer.appendChild(container, title);

    // Input fields with labels
    this.addInputField(container, 'Name', 'text', 'name', 'Your Name');
    this.addInputField(container, 'Email', 'email', 'email', 'yourname@example.com');
    this.addInputField(container, 'Password', 'password', 'password', 'min 6 characters');
    this.addInputField(container, 'Confirm Password', 'password', 'confirm-password', 'Confirm your password');

    // Button
    const button = this.renderer.createElement('button');
    this.renderer.setProperty(button, 'textContent', 'Sign Up');
    this.renderer.listen(button, 'click', this.signUp.bind(this));
    this.renderer.appendChild(container, button);

    // Add "Log In" link
    const loginText = this.renderer.createElement('p');
    const loginLink = this.renderer.createElement('a');
    this.renderer.setProperty(loginLink, 'textContent', 'Already have an account? Log In');
    this.renderer.listen(loginLink, 'click', () => this.navigateToLogin());
    
    this.renderer.appendChild(loginText, loginLink);
    this.renderer.appendChild(container, loginText);

    // Append container to host
    this.renderer.appendChild(this.elRef.nativeElement, container);

    this.createFooter();
  }

  addInputField(container: HTMLElement, labelText: string, type: string, id: string, placeholder: string) {
    const label = this.renderer.createElement('label');
    this.renderer.setProperty(label, 'textContent', labelText);
    this.renderer.appendChild(container, label);

    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'type', type);
    this.renderer.setAttribute(input, 'id', id);
    this.renderer.setAttribute(input, 'placeholder', placeholder);
    this.renderer.appendChild(container, input);

    const errorDiv = this.renderer.createElement('div');
    this.renderer.addClass(errorDiv, 'error-message');
    this.renderer.setAttribute(errorDiv, 'id', `${id}-error`);
    this.renderer.appendChild(container, errorDiv);
  }

  signUp() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

    let isValid = true;

    // Validation logic
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      this.displayError('name', 'Please enter a valid name with only alphabetic characters');
      isValid = false;
    } else this.clearError('name');

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      this.displayError('email', 'Please enter a valid email address');
      isValid = false;
    } else this.clearError('email');

    if (!password || password.length < 6 || !/[!@#$%^&*]/.test(password) || !/\d/.test(password)) {
      this.displayError('password', 'Password must be at least 6 characters with a number and special character');
      isValid = false;
    } else this.clearError('password');

    if (confirmPassword !== password) {
      this.displayError('confirm-password', 'Passwords do not match');
      isValid = false;
    } else this.clearError('confirm-password');

    if (isValid) {
      console.log('Form submitted successfully');
    }
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

  createFooter() {
    // Create footer container
    const footer = this.renderer.createElement('footer');
    const footerContainer = this.renderer.createElement('div');
    this.renderer.addClass(footerContainer, 'footer-container');
    this.renderer.appendChild(footer, footerContainer);

    // Contact Info Section
    const contactInfo = this.renderer.createElement('div');
    this.renderer.addClass(contactInfo, 'contact-info');
    this.renderer.appendChild(footerContainer, contactInfo);

    const contactTitle = this.renderer.createText('Do You Want to Contact Us? Don’t Hesitate!');
    this.renderer.appendChild(contactInfo, this.createElementWithText('h2', contactTitle));

    const contactText = this.renderer.createText('At Study Plan Builder, we are committed to helping you achieve your learning goals...');
    this.renderer.appendChild(contactInfo, this.createElementWithText('p', contactText));

    // Contact Details
    const addressText = this.renderer.createText('Address: Study Plan Builder HQ, Bangalore');
    this.renderer.appendChild(contactInfo, this.createElementWithText('p', addressText));

    const phoneText = this.renderer.createText('Phone: 042888 999');
    this.renderer.appendChild(contactInfo, this.createElementWithText('p', phoneText));

    const emailText = this.renderer.createText('Email: studyplanbuilder@gmail.com');
    this.renderer.appendChild(contactInfo, this.createElementWithText('p', emailText));

    // Social Media Section
    const socialTitle = this.renderer.createText('Follow us:');
    const social = this.renderer.createElement('div');
    this.renderer.addClass(social, 'social');
    this.renderer.appendChild(social, this.createElementWithText('h3', socialTitle));
    this.renderer.appendChild(contactInfo, social);

    // Newsletter Section
    const newsletter = this.renderer.createElement('div');
    this.renderer.addClass(newsletter, 'newsletter');
    this.renderer.appendChild(footerContainer, newsletter);

    const newsletterTitle = this.renderer.createText('Subscribe to Our Newsletter');
    this.renderer.appendChild(newsletter, this.createElementWithText('h3', newsletterTitle));

    const newsletterText = this.renderer.createText('Enter your email and receive the latest updates, tips, and special offers from us...');
    this.renderer.appendChild(newsletter, this.createElementWithText('p', newsletterText));

    // Subscription Form
    const form = this.renderer.createElement('form');
    this.renderer.setAttribute(form, 'id', 'subscribeForm');
    this.renderer.listen(form, 'submit', (event) => this.subscribe(event));
    this.renderer.appendChild(newsletter, form);

    const emailInput = this.renderer.createElement('input');
    this.renderer.setAttribute(emailInput, 'type', 'email');
    this.renderer.setAttribute(emailInput, 'placeholder', 'Enter your email');
    this.renderer.appendChild(form, emailInput);

    const subscribeButton = this.renderer.createElement('button');
    this.renderer.setProperty(subscribeButton, 'textContent', 'Subscribe');
    this.renderer.appendChild(form, subscribeButton);

    // Add footer to the DOM
    this.renderer.appendChild(this.elRef.nativeElement, footer);
  }

  createElementWithText(tag: string, text: string): HTMLElement {
    const element = this.renderer.createElement(tag);
    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(element, textNode);
    return element;
  }

  subscribe(event: Event) {
    event.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed to newsletter');
  }

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile = {
    firstName: '',
    lastName: '',
    state: '',
    city: '',
    college: '',
    address: '',
    email: '',
    phone: '',
    gender: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted successfully:', this.profile);
      alert('Profile updated successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}

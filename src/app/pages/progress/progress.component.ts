import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Make the component standalone
  imports: [CommonModule, FormsModule, RouterModule], // Import required modules here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 
  constructor(private router: Router) {
    
  }

  navigateToStudyPlan() {
    this.router.navigate(['/studyplan']);
  }

  navigateToProgress() {
    this.router.navigate(['/progress']);
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    // Replace with actual login check logic
    return false;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
    const dashboardLink = document.getElementById('dashboard-link');
    const progressLink = document.getElementById('progress-link');
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.querySelector('#about-section') as HTMLElement;

    if (dashboardLink) {
      dashboardLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        if (!this.isLoggedIn()) {
          alert('Please log in to access the Dashboard.');
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    }

    if (progressLink) {
      progressLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        if (!this.isLoggedIn()) {
          alert('Please log in to access the Progress section.');
        } else {
          this.router.navigate(['/progress']);
        }
      });
    }

    // Smooth scroll to About Section
    if (aboutLink && aboutSection) {
      aboutLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        window.scrollTo({
          top: aboutSection.offsetTop,
          behavior: 'smooth'
        });
      });
    }

    // Dynamic title animation
    this.animateTitle();
  }

  animateTitle(): void {
    const title = document.getElementById('dynamic-title');
    if (title) {
      let i = 0;
      const titleText = 'AI-Powered Study Planner';
      const interval = setInterval(() => {
        title!.innerHTML = titleText.slice(0, ++i);
        if (i === titleText.length) clearInterval(interval);
      }, 150);
    }
  }
  
}





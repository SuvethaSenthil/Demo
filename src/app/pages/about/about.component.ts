import { Component, AfterViewInit } from '@angular/core'; 
import { RouterModule } from '@angular/router'; 

@Component({ 
  selector: 'app-about', 
  standalone: true, 
  imports: [RouterModule], 
  templateUrl: './about.component.html', 
  styleUrls: ['./about.component.css'] 
}) 
export class AboutComponent implements AfterViewInit { 
  imageSrc: string = 'assets/images/your-image.jpg'; // Define the image source here

  ngAfterViewInit() { 
    // Ensure DOM is fully initialized before executing this logic
    setTimeout(() => {
      this.activateAnimation();
    }, 1000);
    this.startCounting("totalDownloads", 15100, 20000); 
    this.startCounting("coursesCompleted", 19256, 20000); 
    this.startCounting("happyCustomers", 12100, 20000); 
    this.startCounting("dailyCustomers", 2560, 20000); 
  } 

  activateAnimation() {
    const container = document.querySelector('.containerr');
    if (container) {
      container.classList.add('merged');
    }
  }

  startCounting(id: string, targetValue: number, duration: number): void { 
    const element = document.getElementById(id); 
    let startValue = 0; 
    const increment = targetValue / (duration / 100); 
    if (element) { 
      const interval = setInterval(() => { 
        startValue += increment; 
        element.textContent = Math.floor(startValue).toString(); 
        if (startValue >= targetValue) { 
          clearInterval(interval); 
          element.textContent = targetValue.toString(); 
        } 
      }, 100); 
    } 
  } 
}

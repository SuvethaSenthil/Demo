import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppService } from '../../shared/service/app/app.service';

@Component({
  selector: 'app-ai-study-plan-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studyplan.component.html',
  styleUrls: ['./studyplan.component.css']
})
export class StudyplanComponent {
  topic: string = '';
  timePerDay: number = 1;
  complexity: string = 'beginner';
  
  showQuiz: boolean = false;
  
  

constructor(private appService:AppService){}

  onInputChange(event: Event, field: string): void {
    const value = (event.target as HTMLInputElement).value;
    switch (field) {
      case 'topic':
        this.topic = value;
        break;
      case 'complexity':
        this.complexity = value;
        break;
    }
  }

  incrementTime(): void {
    this.timePerDay++;
  }

  decrementTime(): void {
    if (this.timePerDay > 1) {
      this.timePerDay--;
    }
  }

  generatePlan(): void {
    if (!this.topic) {
      alert('Please fill in all details to generate a study plan.');
      return;
    }

    const studyPlan = {
       message:"Give me the study plan for java "
    };

    this.appService.generatePlan(studyPlan).subscribe(response=>{
      console.log(response);
    },error=>console.log(error))
    

    console.log('Generated Study Plan:', studyPlan);
    this.showQuiz = true;
  }

  

  startQuiz(): void {
    console.log('Quiz started.');
    window.location.href = 'quiz';
  }
}

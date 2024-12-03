import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  language: string = '';
  
  showQuiz: boolean = false;
  
  

/*constructor(private appService:AppService){}*/

  onInputChange(event: Event, field: string): void {
    const value = (event.target as HTMLInputElement).value;
    switch (field) {
      case 'topic':
        this.topic = value;
        break;
      case 'complexity':
        this.complexity = value;
        break;
      case 'language':
        this.language = value;
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

  generateStudyPlan(): void {
    if (!this.topic || !this.language) {
      alert('Please fill in all details to generate a study plan.');
      return;
    }

    const studyPlan = {
      topic: this.topic,
      timePerDay: this.timePerDay,
      complexity: this.complexity,
      language: this.language
    };


     /*const studyPlan = {
      topic: this.topic,
      timePerDay: this.timePerDay,
      complexity: this.complexity,
      language: this.language
    };
    this.appService.generateplan(studyPlan).subscribe(response=>{
      console.log(response);
    },error=>console.log(error))
    
    console.log('Generated Study Plan:', studyPlan);
    this.showSuggestions = true;*/



    console.log('Generated Study Plan:', studyPlan);
    this.showQuiz = true;

    
  }

  

  startQuiz(): void {
    console.log('Quiz started.');
    window.location.href = 'quiz';
  }
}

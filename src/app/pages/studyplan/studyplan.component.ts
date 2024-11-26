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
  showSuggestions: boolean = false;
  suggestedMaterials: { title: string; link: string; type: string }[] = [];

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

    console.log('Generated Study Plan:', studyPlan);
    this.showSuggestions = true;

    // Mock study material suggestions based on topic
    this.suggestedMaterials = [
      { title: 'Intro to ' + this.topic, link: '#', type: 'Article' },
      { title: this.topic + ' Tutorial', link: '#', type: 'Video' },
      { title: 'Advanced ' + this.topic, link: '#', type: 'Course' }
    ];
  }

  skipSuggestions(): void {
    this.showSuggestions = false;
  }

  takeQuiz(): void {
    window.location.href = 'quiz';
    this.showSuggestions=true;
  }
}

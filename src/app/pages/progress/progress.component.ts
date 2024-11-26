import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  // Daily progress
  dailyProgress: number = 0;

  // Quiz details
  totalQuestions: number = 0;
  correctAnswers: number = 0;
  quizScore: number = 0;

  // Weekly progress data
  weekProgress = [
    { name: 'Monday', progress: 0 },
    { name: 'Tuesday', progress: 0 },
    { name: 'Wednesday', progress: 0 },
    { name: 'Thursday', progress: 0 },
    { name: 'Friday', progress: 0 },
    { name: 'Saturday', progress: 0 },
    { name: 'Sunday', progress: 0 }
  ];

  constructor() {}

  ngOnInit(): void {
    this.initializeProgress();
  }

  // Initialize progress data
  initializeProgress(): void {
    // Initialize daily progress
    this.dailyProgress = 0;

    // Initialize quiz score
    this.totalQuestions = 0;
    this.correctAnswers = 0;
    this.quizScore = 0;

    // Initialize weekly progress
    this.weekProgress = this.weekProgress.map(day => ({
      ...day,
      progress: 0
    }));
  }
}

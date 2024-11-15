import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  
  // Sample user and quiz data
  userName = 'John Doe';
  recentQuizName = 'Math Quiz - Algebra';
  recentQuizScore = 85; // Latest quiz score

  // Simulated quiz scores for the week (percentage values)
  weeklyScores = [80, 75, 90, 65, 85, 100, 70];
  
  dailyReport = ''; // Placeholder for the daily report

  constructor() {}

  ngOnInit(): void {
    this.updateWeeklyReport();
  }

  // Function to generate a daily report based on the recent quiz
  generateDailyReport() {
    this.dailyReport = `Daily Report: Today's quiz score is ${this.recentQuizScore}. Keep up the good work!`;
  }

  // Function to update the weekly report based on scores
  updateWeeklyReport() {
    // (Optional: Perform any additional calculations for the weekly report here)
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  totalQuestions: number = 0; // Initial value
  correctAnswers: number = 0; // Initial value
  quizScore: number = 0; // Initial value

  constructor() {}

  ngOnInit(): void {
    this.fetchQuizData();
  }

  fetchQuizData(): void {
    // Simulated delay to mimic backend response
    setTimeout(() => {
      // Replace the following data with actual backend response
      const backendData = {
        totalQuestions: 20,
        correctAnswers: 16,
      };

      // Update quiz data
      this.totalQuestions = backendData.totalQuestions;
      this.correctAnswers = backendData.correctAnswers;
      this.quizScore = Math.round(
        (this.correctAnswers / this.totalQuestions) * 100
      );
    }, 2000); // Simulated 2-second delay
  }
}

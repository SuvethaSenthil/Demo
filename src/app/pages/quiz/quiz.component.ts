import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../shared/service/app/app.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  // Object to store the answers
  answers: { [key: string]: string } = {};
  responseMessage: string = '';
  responseColor: string = '';
  parsedQuestions: { question: string; options: string[] }[] = [];
  parsedAnswers: { questionNumber: number; answer: string }[] = [];
  // Questions for the quiz
  questions = [
    {
      id: 'q1',
      question: 'Which among the following converts primitive data types to object types in Java?',
      options: ['Wrapper Class', 'Convertor Class', 'Object Class', 'Adaptor Class'],
    },
    {
      id: 'q2',
      question: 'What is the size of an integer in Java?',
      options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
    },
    {
      id: 'q3',
      question: 'Who invented Java programming language?',
      options: ['James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup', 'Guido van Rossum'],
    },
    {
      id: 'q4',
      question: 'Which of the following is not a Java feature?',
      options: ['Object-oriented', 'Secure', 'Slow', 'Robust'],
    },
    {
      id: 'q5',
      question: 'What does JVM stand for?',
      options: ['Java Virtual Machine', 'Java Middleware', 'Java Visual Manager', 'Java Variable Manager'],
    },
  ];

  quizForm!: FormGroup;

  // Dynamic Questions Array


  constructor(private fb: FormBuilder, private appService: AppService) {
    this.quizForm = this.fb.group({
      questions: this.fb.array([]) // Empty FormArray to be populated dynamically
    });
  }

  ngOnInit(): void {
    const payload = {
      text: "Generate 10  mcqs on Java"
    }
    this.appService.generateQuiz(payload).subscribe((res: any) => {
      console.log(res)
      const data = this.parseInputData(res.newQuiz.text.split('**'));
      console.log(data, this.parsedQuestions, this.parsedAnswers);
  
      this.quizForm = this.fb.group({
        questions: this.fb.array(this.parsedQuestions.map(() => this.createQuestionGroup()))
      });
      // this.populateQuestions();
    });

  }
  private createQuestionGroup(): FormGroup {
    return this.fb.group({
      answer: [''] // Default value for answer is empty
    });
  }
  
  get questionsArray(): FormArray {
    console.log("working here")
    return this.quizForm.get('questions') as FormArray;
  }
  parseInputData(data: string[]): void {

    let isAnswerSection = false;

    for (let i = 0; i < data.length; i++) {
      const text = data[i].trim();

      // Check if we've reached the answer section
      if (text.toLowerCase().startsWith('answer')) {
        isAnswerSection = true;
        continue; // Skip "Answer Key:" line
      }
      if (isAnswerSection) {
        // Process answers
        console.log(text);
        const answerMatches = text.match(/(\d+)\.\s+([a-d]\))/g); // Match "1. c)", "2. b)", etc.
        if (answerMatches) {
          answerMatches.forEach((match) => {
            const matchResult = match.match(/(\d+)\.\s+([a-d])\)\s+([^\r\n]+)/);
  
            if (matchResult) {
              const [_, questionNumber, option, answerText] = matchResult;
              console.log(option, answerText);
          
              this.parsedAnswers.push({
                questionNumber: parseInt(questionNumber, 10),
                answer: answerText.trim(),
              });
            }
          });
        }
      } else {
        console.log("question section");
        // Process questions and options
        const questionText = data[i].trim();
        const optionsText = data[i + 1]?.trim();

        if (questionText && optionsText?.match(/^a\)/)) {
          const options = optionsText.split('\n').map((line) => line.slice(3).trim()); // Remove "a)", "b)", etc.
          this.parsedQuestions.push({
            question: questionText,
            options: options,
          });
          i++; // Skip the options part in the next iteration
        }
      }
    }
  }

  // Handle Form Submission
  onSubmit(): void {
    console.log(this.quizForm.valid,this.quizForm.value);
    
  }
  // Method to save answers
  saveAnswer(questionId: string, selectedOption: string): void {
    this.answers[questionId] = selectedOption;
    this.responseMessage = 'Answer for ${questionId} saved successfully!';
    this.responseColor = 'green';
  }

  // Method to reset the quiz
  resetQuiz(): void {
    this.answers = {};
    this.responseMessage = 'All answers have been reset.';
    this.responseColor = 'orange';
  }

  // Method to finish the quiz
  finishQuiz(): void {
    if (Object.keys(this.answers).length === this.questions.length) {
      this.responseMessage = 'Quiz submitted successfully! Your responses have been recorded.';
      this.responseColor = 'green';
    } else {
      this.responseMessage = 'Please answer all questions before finishing the quiz.';
      this.responseColor = 'red';
    }
  }
}

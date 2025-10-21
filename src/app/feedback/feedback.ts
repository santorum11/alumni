import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../api';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.scss'],
  providers: [Api],
})
export class Feedback {
  feedbackForm;

  submitted = false;

  constructor(private fb: FormBuilder, private api: Api) {
    // Initialize form here inside constructor
    this.feedbackForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm() {
    if (this.feedbackForm.valid) {
      this.api.post('feedback', this.feedbackForm.value).subscribe({
        next: () => {
          this.submitted = true;
          this.feedbackForm.reset();
        },
        error: () => {
          alert('Could not send feedback, try again!');
        }
      });
    }
  }
}

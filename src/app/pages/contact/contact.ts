import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Api } from '../../api';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  providers: [Api],
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private api: Api) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.api.post('contact', this.contactForm.value).subscribe({
        next: () => {
          alert('Thank you for contacting us! We will get back to you soon.');
          this.contactForm.reset();
        },
        error: () => {
          alert('Failed to send message. Please try again later.');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
 }
}

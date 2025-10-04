import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  providers: [Api]
})
export class Register implements OnInit {
  registrationForm!: FormGroup;
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  foodPreferences = ['Vegetarian', 'Non-Vegetarian', 'Vegan'];
  today = new Date();

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private api: Api) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [''],
      bloodGroup: [''],
      foodPreference: [''],
      contactNumber: [''],
      emailId: ['', [Validators.email]],
      currentAddress: [''],
      yearOfAdmission: [''],
      yearOfPassing: [''],
      batch: [''],
      occupation: [''],
      organization: [''],
      areaOfExpertise: [''],
      mentorJuniors: [''],
      donate: [''],
      availableForReunion: [''],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = { ...this.registrationForm.value };
      this.api.post('register', formData).subscribe({
        next: () => alert('Registration successful!'),
        error: () => alert('Registration failed!')
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}

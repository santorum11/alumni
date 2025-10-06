import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [Api],
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private api: Api, private router: Router) {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.api.loginAdmin(this.loginForm.value).subscribe({
        next: (res) => {
          this.api.setToken(res.token);
          this.router.navigate(['/landing']);
        },
        error: (err) => {
          alert(err.error?.message || 'Login failed!');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

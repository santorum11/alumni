import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-donate-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './donate-dialog.html',
  styleUrls: ['./donate-dialog.scss']
})
export class DonateDialog {
  donateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DonateDialog>
  ) {
    // Initialize form here
    this.donateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      reference: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.donateForm.valid) {
      this.dialogRef.close(this.donateForm.value);
    }
  }
}

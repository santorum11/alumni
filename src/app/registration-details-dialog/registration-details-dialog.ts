import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './registration-details-dialog.html',
  styleUrls: ['./registration-details-dialog.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationDetailsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

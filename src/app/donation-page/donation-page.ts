import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DonateDialog } from '../donate-dialog/donate-dialog';
import { Api } from '../api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-donation-page',
  imports: [HttpClientModule],
  templateUrl: './donation-page.html',
  styleUrl: './donation-page.scss',
  providers: [Api]
})
export class DonationPage {

  constructor(private api: Api, private dialog: MatDialog) {}

  openDonateDialog() {
  const dialogRef = this.dialog.open(DonateDialog, {
    width: '410px'
  });
  dialogRef.afterClosed().subscribe(formData => { 
    if (formData) {
        // Use api.donate method instead of generic post if available
        this.api.donate(formData).subscribe(() => {
          alert('Donation details saved. Thank you!');
        }, () => {
          alert('Failed to save donation details, please try again.');
        });
      }
  });
}
}

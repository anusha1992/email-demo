import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmailDialogComponent } from './components/email-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LTIMindtree Interview Email Content';

  constructor(private dialog: MatDialog) {}

  openEmailDialog() {
    this.dialog.open(EmailDialogComponent, {
      height: '500px',
      width: '800px',
    });
  }
}

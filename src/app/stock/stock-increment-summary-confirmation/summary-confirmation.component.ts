import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../stock-increment-summary/stock-increment-summary.component'

@Component({
  selector: 'app-summary-confirmation',
  templateUrl: './summary-confirmation.component.html',
  styleUrls: ['./summary-confirmation.component.scss']
})
export class SummaryConfirmationComponent {

  public reason: string;

  constructor(public dialogRef: MatDialogRef<SummaryConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.data.confirmSave.emit(this.reason);
    this.dialogRef.close();
  }

}

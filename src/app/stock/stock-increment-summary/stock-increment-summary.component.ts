import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { StockService } from '../stock.service';
import { IProduct } from 'src/app/model/interfaces/product.interface';
import { NotificationService } from 'src/app/service/notification.service';
import { MatDialog } from '@angular/material';
import { SummaryConfirmationComponent } from '../stock-increment-summary-confirmation/summary-confirmation.component';

export interface DialogData {
  numChanges: number;
  confirmSave: EventEmitter<string>;
}

@Component({
  selector: 'app-stock-increment-summary',
  templateUrl: './stock-increment-summary.component.html',
  styleUrls: ['./stock-increment-summary.component.scss']
})
export class StockIncrementSummaryComponent implements OnInit {

  products: IProduct[];
  public displayedColumns: string[] = ['reference', 'name', 'color', 'size', 'stock'];
  public confirmSave = new EventEmitter<string>();

  get increments() {
    return this.stockService.stockIncrements;
  }

  constructor(private stockService: StockService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    this.stockService.getProductWithIncrements().subscribe( products => {
      this.products = products;
    });

    this.confirmSave.subscribe( reason => {
      this.saveAndGoBack(reason);
    } );
  }

  private saveAndGoBack(reason: string) {
    this.stockService.saveStockIncrements(reason).subscribe( () => {
      this.increments.clear();
      this.notificationService.showInfo('Stock actualizado correctamente');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(SummaryConfirmationComponent, {
      width: '350px',
      data: {
        numChanges: this.increments.getStockIds().length,
        confirmSave: this.confirmSave
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  clear() {
    this.increments.clear();
    this.products = [];
  }

}

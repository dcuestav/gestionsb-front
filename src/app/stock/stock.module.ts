import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatButtonModule,
         MatButtonToggleModule,
         MatChipsModule,
         MatDialogModule,
         MatIconModule,
         MatInputModule,
         MatFormFieldModule,
         MatListModule,
         MatPaginatorModule,
         MatSidenavModule,
         MatTableModule } from '@angular/material';

import { StockComponent } from './stock/stock.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { StockService } from './stock.service';
import { StockTableVariationComponent } from './stock-table-variation/stock-table-variation.component';
import { StockIncrementSummaryComponent } from './stock-increment-summary/stock-increment-summary.component';
import { SummaryConfirmationComponent } from './stock-increment-summary-confirmation/summary-confirmation.component';
import { HistoryComponent } from './history/history/history.component';
import { StockProductComponent } from './stock-product/stock-product.component';

@NgModule({
  declarations: [
    StockComponent,
    StockTableComponent,
    StockTableVariationComponent,
    StockIncrementSummaryComponent,
    SummaryConfirmationComponent,
    HistoryComponent,
    StockProductComponent
  ],
  providers: [StockService],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule
  ],
  entryComponents: [SummaryConfirmationComponent]
})
export class StockModule { }

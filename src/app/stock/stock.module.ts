import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock/stock.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { StockTableComponent } from './stock-table/stock-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { StockService } from './stock.service';

@NgModule({
  declarations: [
    StockComponent,
    StockTableComponent
  ],
  providers: [StockService],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class StockModule { }

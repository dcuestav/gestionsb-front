import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes/quotes.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { QuotesService } from './quotes.service';

@NgModule({
  declarations: [QuotesComponent],
  providers: [QuotesService],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class QuotesModule { }

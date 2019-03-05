import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes/quotes.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { QuotesService } from './quotes.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuoteEditComponent } from './quote-edit/quote-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { QuoteEditLineComponent } from './quote-edit-line/quote-edit-line.component';

@NgModule({
  declarations: [QuotesComponent, QuoteEditComponent, QuoteEditLineComponent],
  providers: [QuotesService],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
  ]
})
export class QuotesModule { }

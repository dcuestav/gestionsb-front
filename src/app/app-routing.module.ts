import { QuoteEditComponent } from './quotes/quote-edit/quote-edit.component';
import { QuotesComponent } from './quotes/quotes/quotes.component';
import { StockComponent } from './stock/stock/stock.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'stock', component: StockComponent },
  { path: 'presupuestos', component: QuotesComponent },
  { path: 'presupuestos/:id', component: QuoteEditComponent },
  { path: '',
    redirectTo: '/stock',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

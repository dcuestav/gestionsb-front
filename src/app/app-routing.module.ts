import { HistoryComponent } from './stock/history/history/history.component';
import { QuotePrintComponent } from './quotes/quote-print/quote-print.component';
import { QuoteEditComponent } from './quotes/quote-edit/quote-edit.component';
import { QuotesComponent } from './quotes/quotes/quotes.component';
import { StockComponent } from './stock/stock/stock.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { StockIncrementSummaryComponent } from './stock/stock-increment-summary/stock-increment-summary.component';
import { StockProductComponent } from './stock/stock-product/stock-product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stock', component: StockComponent },
  { path: 'stock/cambios', component: StockIncrementSummaryComponent },
  { path: 'stock/movimientos', component: HistoryComponent },
  { path: 'stock/:id', component: StockProductComponent },
  { path: 'presupuestos', component: QuotesComponent },
  { path: 'presupuestos/:id', component: QuoteEditComponent },
  { path: 'presupuestos/:id/imprimir', component: QuotePrintComponent },
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

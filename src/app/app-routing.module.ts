import { HomeComponent } from './main/home/home.component';
import { QuotePrintComponent } from './quotes/quote-print/quote-print.component';
import { QuoteEditComponent } from './quotes/quote-edit/quote-edit.component';
import { QuotesComponent } from './quotes/quotes/quotes.component';
import { StockComponent } from './stock/stock/stock.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './main/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stock', component: StockComponent },
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

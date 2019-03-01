import { QuotesComponent } from './quotes/quotes/quotes.component';
import { StockComponent } from './stock/stock/stock.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'stock', component: StockComponent },
  { path: 'quotes', component: QuotesComponent },
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

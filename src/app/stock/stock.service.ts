import { StockIncrements } from './stock-increments';
import { Injectable } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Category } from '../model/category';
import { IProduct } from '../model/interfaces/product.interface';
import { Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StockService {

  stockIncrements = new StockIncrements();

  constructor(private productService: ProductService,
              private errorService: NotificationService) {
  }

  getCategories(): Promise<Category[]> {
    return this.productService.getCategories();
  }

  getProductsOfCategory(category: Category): Observable<IProduct[]> {
    const products$ = this.productService.getProductsOfCategory(category);
    return products$;
  }

  getProductWithIncrements(): Observable<IProduct[]> {
    const stockIds = this.stockIncrements.getStockIds();
    return this.productService.getStockProducts(stockIds);
  }

  saveStockIncrements(): Observable<void> {
    return this.productService.updateStocks(this.stockIncrements);
  }

  handleError(error: HttpErrorResponse) {
    this.errorService.showError(error);
  }

}

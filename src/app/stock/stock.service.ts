import { Injectable } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Category } from '../model/category';
import { IProduct } from '../model/interfaces/product.interface';
import { Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StockService {

  stockIncrements = [];

  constructor(private productService: ProductService,
              private errorService: NotificationService) {
  }

  getCategories(): Promise<Category[]> {
    return this.productService.getCategories();
  }

  getProductsOfCategory(category: Category): Observable<IProduct[]> {
    const products$ = this.productService.getProductsOfCategory(category);
    this.fillStockIncrements(products$);
    return products$;
  }

  private fillStockIncrements( products$: Observable<IProduct[]>) {
    products$.subscribe( products => {
      products.forEach( product => {
        if (product.idStock && this.stockIncrements[product.idStock] === undefined) {
          this.stockIncrements[product.idStock] = 0;
        }
      } );
    });
  }

  handleError(error: HttpErrorResponse) {
    this.errorService.showError(error);
  }

}

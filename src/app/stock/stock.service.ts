import { Injectable } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Category } from '../model/category';
import { IProduct } from '../model/interfaces/product.interface';
import { Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StockService {

  constructor(private productService: ProductService,
              private errorService: NotificationService) {
  }

  getCategories(): Promise<Category[]> {
    return this.productService.getCategories();
  }

  getProductsOfCategory(category: Category): Observable<IProduct[]> {
    return this.productService.getProductsOfCategory(category);
  }

  handleError(error: HttpErrorResponse) {
    this.errorService.showError(error);
  }

}

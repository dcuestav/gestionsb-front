import { Injectable } from '@angular/core';
import { StockModule } from './stock.module';
import { ProductService } from '../service/product.service';
import { Category } from '../model/category';
import { IProduct } from '../model/interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: StockModule
})
export class StockService {

  constructor(private productService: ProductService) {
  }

  getCategories(): Promise<Category[]> {
    return this.productService.getCategories();
  }

  getProductsOfCategory(category: Category): Observable<IProduct[]> {
    return this.productService.getProductsOfCategory(category);
  }

}

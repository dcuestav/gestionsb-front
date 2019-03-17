import { StockVariation } from './model/stock-variation';
import { StockIncrements } from './model/stock-increments';
import { Injectable, LOCALE_ID } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Category } from '../model/category';
import { IProduct } from '../model/interfaces/product.interface';
import { Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { StockMovement } from './model/stock-movement';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { IStockMovement } from './model/interfaces/stock-movement.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class StockService {

  private stockMovementsUrl = `${environment.apiServer}/stockmovements`;

  stockIncrements = new StockIncrements();

  constructor(private http: HttpClient,
              private productService: ProductService,
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

  saveStockIncrements(reason?: string): Observable<void> {
    const stockVariation: StockVariation = {
      customReason: reason,
      stockIncrements: this.stockIncrements.getRequestObject()
    };
    return this.productService.updateStocks(stockVariation);
  }

  getMovementsByDate(date: Date): Observable<StockMovement[]> {
    const datePipe = new DatePipe('es');
    const dateString = datePipe.transform(date, 'yyyy-MM-dd');

    const url = `${this.stockMovementsUrl}/date/${dateString}`;

    return this.http.get<IStockMovement[]>(url).pipe(map( mvtDTOs => mvtDTOs.map( mvtDTO => new StockMovement(mvtDTO) )));
  }

  handleError(error: HttpErrorResponse) {
    this.errorService.showError(error);
  }

}

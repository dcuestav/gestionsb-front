import { Category } from './../model/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../model/interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockVariation } from '../stock/model/stock-variation';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = `${environment.apiServer}/products`;

  constructor(private http: HttpClient) { }

  async getCategories(): Promise<Category[]> {

    const categories = [];

    categories.push(new Category({ id: 12, name: 'Basic 50/50'}));
    categories.push(new Category({ id: 28, name: 'Basic 100%'}));
    categories.push(new Category({ id: 31, name: 'Percal 50/50'}));
    categories.push(new Category({ id: 29, name: 'Percal 100%'}));
    categories.push(new Category({ id: 34, name: 'Satén'}));
    categories.push(new Category({ id: 13, name: 'Colchas'}));
    categories.push(new Category({ id: 15, name: 'Mantas y edredones'}));
    categories.push(new Category({ id: 16, name: 'Protectores'}));
    categories.push(new Category({ id: 17, name: 'Almohadas'}));
    categories.push(new Category({ id: 18, name: 'Toallas'}));
    categories.push(new Category({ id: 19, name: 'Cuna'}));
    categories.push(new Category({ id: 35, name: 'Mesa'}));

    return categories;
  }

  getAllProducts(): Observable<IProduct[]> {

    return this.http.get<IProduct[]>(this.productsUrl);
  }

  getProductsOfCategory(selectedCategory: Category): Observable<IProduct[]> {

    const url = `${this.productsUrl}/${selectedCategory.id}`;

    return this.http.get<IProduct[]>(url);
  }

  getStockProducts(stockIds: any[]): Observable<IProduct[]> {

    const url = `${this.productsUrl}/stock`;

    return this.http.post<IProduct[]>(url, stockIds);
  }

  updateStocks(stockVariation: StockVariation) {

    const url = `${this.productsUrl}/stock`;

    return this.http.put<void>(url, stockVariation);
  }

}

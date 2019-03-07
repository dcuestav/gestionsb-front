import { Category } from './../model/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../model/interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

    const url = `http://localhost:8080/products`;

    return this.http.get<IProduct[]>(url);
  }

  getProductsOfCategory(selectedCategory: Category): Observable<IProduct[]> {

    const url = `http://localhost:8080/products/${selectedCategory.id}`;

    return this.http.get<IProduct[]>(url);
  }

}

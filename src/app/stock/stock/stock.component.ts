import { ProductService } from './../../service/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/model/category';
import { MatSidenav } from '@angular/material/sidenav';
import { IProduct } from 'src/app/model/interfaces/product.interface';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @ViewChild(MatSidenav) matSidenav;

  private categories: Category[] = [];
  private selectedCategory: Category;
  private products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadCategories();
  }

  private async loadCategories() {
    this.categories = await this.productService.getCategories();
    this.matSidenav.open();
    if (this.categories && this.categories[0]) {
      this.selectCategory(this.categories[0]);
    }
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.loadProductsFromSelectedCategory();
  }

  isSelectCategory(category: Category) {
    return this.selectedCategory.name === category.name;
  }

  private loadProductsFromSelectedCategory() {
    this.productService.getProductsOfCategory(this.selectedCategory).subscribe( products => {
      this.products = products;
    });
  }

}

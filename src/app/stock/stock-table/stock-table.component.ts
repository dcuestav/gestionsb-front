import { IProduct } from 'src/app/model/interfaces/product.interface';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';


@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {

  private isMobile = window.innerWidth < 600;
  public displayedColumns: string[] = ['reference', 'name', 'color', 'size', 'price', 'currentStock'];

  private allProducts: IProduct[];
  public models: string[];
  public filteredProducts: IProduct[];
  public filterModel: string;

  @Output()
  public toggleCategoriesMenuEvent = new EventEmitter();

  @Input()
  set products(products: IProduct[]) {
    const productNames = products.map( product => product.name);
    this.models = _.uniq(productNames);
    this.allProducts = products;
    this.filterModel = null;
    this.applyFilter();
  }

  get products() {
    return this.allProducts;
  }

  constructor() { }

  ngOnInit() {
    if (this.isMobile) {
      this.displayedColumns = this.displayedColumns.filter( column => column !== 'name' && column !== 'price');
    }
  }

  public toggleFilter(model: string) {
    this.filterModel = (this.filterModel === model) ? null : model;
    this.applyFilter();
  }

  toggleCategoriesMenu() {
    this.toggleCategoriesMenuEvent.emit(null);
  }

  private applyFilter() {
    if (this.filterModel) {
      this.filteredProducts = this.allProducts.filter( product => product.name === this.filterModel );
    } else if (this.isMobile) {
      this.filteredProducts = [];
    } else {
      this.filteredProducts = this.allProducts;
    }
  }

}

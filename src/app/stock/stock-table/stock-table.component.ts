import { StockService } from './../stock.service';
import { IProduct } from 'src/app/model/interfaces/product.interface';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { ResponsiveService } from 'src/app/service/responsive.service';


@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {

  public displayedColumns: string[] = ['reference', 'name', 'color', 'size', 'stock'];

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

  get increments() {
    return this.stockService.stockIncrements;
  }

  constructor(private responsiveService: ResponsiveService,
              private stockService: StockService) {
  }

  public isMobile() {
    return this.responsiveService.isMobile();
  }

  ngOnInit() {
    if (this.isMobile()) {
      this.displayedColumns = ['reference', 'color', 'size', 'stock'];
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
    } else if (this.isMobile()) {
      this.filteredProducts = [];
    } else {
      this.filteredProducts = this.allProducts;
    }
  }

}

import { IProduct } from 'src/app/model/interfaces/product.interface';
import { Product } from './../../model/product';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'reference', 'color', 'size', 'price', 'currentStock'];

  private models: string[];
  private prods: IProduct[];

  @Input()
  set products(products: IProduct[]) {
    const productNames = products.map( product => product.name);
    this.models = _.uniq(productNames);
    this.prods = products;
  }

  get products() {
    return this.prods;
  }

  constructor() { }

  ngOnInit() { }

}

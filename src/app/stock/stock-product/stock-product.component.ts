import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockMovement } from '../model/stock-movement';
import { IProduct } from 'src/app/model/interfaces/product.interface';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html',
  styleUrls: ['./stock-product.component.scss']
})
export class StockProductComponent implements OnInit {

  DEFAULT_PAGE_SIZE = 10;

  stockId: string;
  movements: StockMovement[];
  displayedColumns = ['date', 'reason', 'order', 'quantity'];
  product: IProduct;

  pageSize = this.DEFAULT_PAGE_SIZE;
  pageNumber = 0;
  totalElements: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: StockService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      const stockId = params.get('id');
      if (!stockId || isNaN(Number(stockId))) {
        return;
      }
      this.stockId = stockId;
      this.getMovementsPage(this.pageSize, this.pageNumber);
      this.service.getStockProduct(stockId).subscribe( product => {
        this.product = product;
      });
    });
  }

  public loadPage(pageEvent: PageEvent) {
    this.getMovementsPage(pageEvent.pageIndex, pageEvent.pageSize);
  }

  private getMovementsPage(page?: number, size?: number) {
    this.service.getMovementsByProduct(this.stockId, page, size).subscribe( pageResults => {
      this.movements = pageResults.elements;
      this.pageSize = pageResults.size;
      this.pageNumber = pageResults.page;
      this.totalElements = pageResults.totalElements;
    }, error => {});
  }

}

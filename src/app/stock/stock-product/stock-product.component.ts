import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { ActivatedRoute } from '@angular/router';
import { StockMovement } from '../model/stock-movement';
import { IProduct } from 'src/app/model/interfaces/product.interface';
import { PageEvent } from '@angular/material';
import { SpinnerService } from 'src/app/service/spinner.service';

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
              private spinner: SpinnerService,
              private service: StockService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      const stockId = params.get('id');
      if (!stockId || isNaN(Number(stockId))) {
        return;
      }
      this.stockId = stockId;
      this.getMovementsPage(this.pageSize, this.pageNumber);
      this.loadProduct(stockId);
    });
  }

  public loadPage(pageEvent: PageEvent) {
    this.getMovementsPage(pageEvent.pageIndex, pageEvent.pageSize);
  }

  private loadProduct(stockId: string) {
    this.spinner.show();
    this.service.getStockProduct(stockId).subscribe( product => {
      this.spinner.hide();
      this.product = product;
    }, () => this.spinner.hide());
  }

  private getMovementsPage(page?: number, size?: number) {
    this.spinner.show();
    this.service.getMovementsByProduct(this.stockId, page, size).subscribe( pageResults => {
      this.spinner.hide();
      this.movements = pageResults.elements;
      this.pageSize = pageResults.size;
      this.pageNumber = pageResults.page;
      this.totalElements = pageResults.totalElements;
    }, () => this.spinner.hide());
  }

}

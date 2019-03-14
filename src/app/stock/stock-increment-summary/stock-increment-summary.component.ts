import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { IProduct } from 'src/app/model/interfaces/product.interface';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-stock-increment-summary',
  templateUrl: './stock-increment-summary.component.html',
  styleUrls: ['./stock-increment-summary.component.scss']
})
export class StockIncrementSummaryComponent implements OnInit {

  products: IProduct[];
  public displayedColumns: string[] = ['reference', 'name', 'color', 'size', 'currentStock'];

  get increments() {
    return this.stockService.stockIncrements;
  }

  constructor(private stockService: StockService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.stockService.getProductWithIncrements().subscribe( products => {
      this.products = products;
    });
  }

  saveAndGoBack() {
    this.stockService.saveStockIncrements().subscribe( () => {
      this.increments.clear();
      this.notificationService.showInfo('Stock actualizado correctamente');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  clear() {
    this.increments.clear();
    this.products = [];
  }

}

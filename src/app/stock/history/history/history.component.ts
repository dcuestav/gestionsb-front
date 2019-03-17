import { Component, OnInit } from '@angular/core';
import { StockService } from '../../stock.service';
import { StockMovement } from '../../model/stock-movement';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  movements: StockMovement[];
  displayedColumns = ['date', 'reason', 'reference', 'name', 'size', 'color', 'quantity'];

  constructor(private stockService: StockService) { }

  ngOnInit() {

    this.stockService.getMovementsByDate(new Date()).subscribe( (movements) => {
      this.movements = movements;
    } );
  }

}

import { Component, OnInit } from '@angular/core';
import { StockService } from '../../stock.service';
import { StockMovement } from '../../model/stock-movement';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  movements: StockMovement[];
  displayedColumns = ['reason', 'order', 'reference', 'name', 'size', 'color', 'quantity'];
  date: Date;

  constructor(private stockService: StockService,
              private router: Router,
              private route: ActivatedRoute
    ) { }

  ngOnInit() {

    this.route.queryParams.subscribe( params => {
      const selectedDate = (params && params.get) ? params.get('fecha') : undefined;
      if (selectedDate) {
        this.date = new Date(selectedDate);
      } else {
        this.date = new Date();
      }
      this.loadMovements();
    });
  }

  previousDay() {
    const newDate = new Date(this.date);
    newDate.setDate(this.date.getDate() - 1);
    this.date = newDate;
    this.loadMovements();
  }

  nextDay() {
    const newDate = new Date(this.date);
    newDate.setDate(this.date.getDate() + 1);
    this.date = newDate;
    this.loadMovements();
  }

  private loadMovements() {
    this.stockService.getMovementsByDate(this.date).subscribe( (movements) => {
      this.movements = movements;
    } );
  }

}

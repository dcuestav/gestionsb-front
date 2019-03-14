import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material';

@Component({
  selector: 'app-stock-table-variation',
  templateUrl: './stock-table-variation.component.html',
  styleUrls: ['./stock-table-variation.component.scss']
})
export class StockTableVariationComponent implements OnInit {

  @Input() currentValue: number;
  @Input() variation: number;
  @Output() variationChange = new EventEmitter<number>();

  @ViewChild(MatButtonToggleGroup)
  toggleGroup: MatButtonToggleGroup;

  constructor() { }

  ngOnInit() {
  }

  addIncrement(event: MatButtonToggleChange) {
    const increment = Number(event.value);
    this.variation += increment;
    this.variationChange.emit(this.variation);
    this.toggleGroup.value = null; // unselect
  }

}

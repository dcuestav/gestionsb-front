import { Quote } from './../../model/quote.model';
import { QuotesService } from './../quotes.service';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'date', 'client', 'total', 'state'];
  public quotes: Quote[] = [];

  constructor(private service: QuotesService,
              private errorService: ErrorService) { }

  ngOnInit() {

    this.service.getQuotes(0, 15)
      .subscribe( page => {
        this.quotes = page.elements.map( quoteDTO => new Quote(quoteDTO));
      }, error => this.errorService.showError(error) );
  }

}

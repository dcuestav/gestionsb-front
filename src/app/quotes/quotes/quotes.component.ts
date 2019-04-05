import { QuoteState, QuoteStateLabels } from './../../model/enums/quote-state';
import { Quote } from './../../model/quote.model';
import { QuotesService } from './../quotes.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  public DEFAULT_PAGE_SIZE = 10;

  public displayedColumns: string[] = ['clone', 'id', 'date', 'client', 'total', 'state', 'print'];
  public quotes: Quote[] = [];
  public pageSize = this.DEFAULT_PAGE_SIZE;
  public pageNumber = 0;
  public totalElements: number;

  constructor(private service: QuotesService,
              private spinner: SpinnerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getQuotes(this.pageNumber, this.pageSize);
  }

  public loadPage(pageEvent: PageEvent) {
    this.getQuotes(pageEvent.pageIndex, pageEvent.pageSize);
  }

  private getQuotes(page: number, size: number) {
    this.spinner.show();
    this.service.getQuotes(page, size)
      .subscribe( pageResults => {
        this.spinner.hide();
        this.quotes = pageResults.elements.map( quoteDTO => new Quote(quoteDTO));
        this.pageSize = pageResults.size;
        this.pageNumber = pageResults.page;
        this.totalElements = pageResults.totalElements;

      }, error => { this.spinner.hide(); } );
  }

  public goToQuoteDetail(quote: Quote) {
    this.router.navigate([quote.id], {relativeTo: this.route});
  }

  public newQuote() {
    this.router.navigate(['nuevo'], {relativeTo: this.route});
  }

  public print(quote: Quote) {
    this.router.navigate([quote.id, 'imprimir'], {relativeTo: this.route});
  }

  public getQuoteStateKeys() {
    return Object.keys(QuoteState);
  }

  public getQuoteStateLabel(key: string): string {
    return QuoteStateLabels[QuoteState[key]];
  }

  public quoteStateChange(quote: Quote, newStateValue: string) {
    this.service.updateQuoteState(quote.id, newStateValue).subscribe( () => {
      quote.state = QuoteState[newStateValue];
    }, error => {} );
  }

  public clone(quote: Quote) {
    this.service.cloneQuote(quote.id).then( () => {
      this.pageNumber = 0;
      this.getQuotes(this.pageNumber, this.pageSize);
    });
  }

}

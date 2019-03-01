import { Quote } from './../../model/quote.model';
import { QuotesService } from './../quotes.service';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/service/error.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  public DEFAULT_PAGE_SIZE = 10;

  public displayedColumns: string[] = ['id', 'date', 'client', 'total', 'state'];
  public quotes: Quote[] = [];
  public pageSize = this.DEFAULT_PAGE_SIZE;
  public pageNumber = 0;
  public totalElements: number;

  constructor(private service: QuotesService,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.getQuotes(this.pageNumber, this.pageSize);
  }

  public loadPage(pageEvent: PageEvent) {
    this.getQuotes(pageEvent.pageIndex, pageEvent.pageSize);
  }

  private getQuotes(page: number, size: number) {

    this.service.getQuotes(page, size)
      .subscribe( page => {
        this.quotes = page.elements.map( quoteDTO => new Quote(quoteDTO));
        this.pageSize = page.size;
        this.pageNumber = page.page;
        this.totalElements = page.totalElements;
      }, error => this.errorService.showError(error) );
  }

}

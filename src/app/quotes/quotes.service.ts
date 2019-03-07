import { Injectable } from '@angular/core';
import { IQuote } from '../model/interfaces/quote.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../model/interfaces/page.interface';
import { Observable } from 'rxjs';
import { Quote } from '../model/quote.model';
import { map } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';
import { ProductService } from '../service/product.service';
import { IProduct } from '../model/interfaces/product.interface';
import { QuoteState } from '../model/enums/quote-state';

@Injectable()
export class QuotesService {

  constructor(private http: HttpClient,
              private errorService: NotificationService,
              private productService: ProductService) {
  }

  public getQuotes(page: number, size: number) {

    const url = `http://localhost:8080/quote/?page=${page}&size=${size}`;

    return this.http.get<IPage<IQuote>>(url);
  }

  public getQuoteById(id: string): Observable<Quote> {

    const url = `http://localhost:8080/quote/${id}`;

    return this.http.get<IQuote>(url).pipe(
      map(quoteDto => new Quote(quoteDto))
    );
  }

  public handleError(error: HttpErrorResponse) {
    this.errorService.showError(error);
  }

  public showError(error: string) {
    this.errorService.notification.next(error);
  }

  public getAllProducts(): Observable<IProduct[]> {
    return this.productService.getAllProducts();
  }

  public updateQuoteState(quoteId: number, newStateKey: string) {

    const url = `http://localhost:8080/quote/${quoteId}/state`;

    return this.http.put<any>(url, newStateKey);
  }

  public saveQuote(quote: Quote) {

    const url = `http://localhost:8080/quote`;

    if (quote.id) {
      return this.http.put<any>(url, quote);
    } else {
      return this.http.post<any>(url, quote);
    }
  }

  public cloneQuote(quoteId: number): Promise<void> {
    return new Promise( (accept, reject) => {
      this.getQuoteById(String(quoteId)).subscribe( quote => {
        quote.id = null;
        quote.client.id = null;
        quote.lines.forEach( line => { line.id = null; });
        quote.state = QuoteState.EDITABLE;
        this.saveQuote(quote).subscribe( () => {
          accept();
        }, error => { reject(); });
      }, error => { reject(); });
    });
  }

}

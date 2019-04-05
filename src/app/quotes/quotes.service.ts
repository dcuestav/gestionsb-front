import { Injectable } from '@angular/core';
import { IQuote } from '../model/interfaces/quote.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../model/interfaces/page.interface';
import { Observable, throwError } from 'rxjs';
import { Quote } from '../model/quote.model';
import { map, catchError } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';
import { ProductService } from '../service/product.service';
import { IProduct } from '../model/interfaces/product.interface';
import { QuoteState } from '../model/enums/quote-state';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuotesService {

  private quotesUrl = `${environment.apiServer}/quote`;

  constructor(private http: HttpClient,
              private errorService: NotificationService,
              private productService: ProductService) {
  }

  public getQuotes(page: number, size: number) {

    const url = `${this.quotesUrl}/?page=${page}&size=${size}`;

    return this.http.get<IPage<IQuote>>(url)
     .pipe(catchError(err => this.handleError(err)));
  }

  public getQuoteById(id: string): Observable<Quote> {

    const url = `${this.quotesUrl}/${id}`;

    return this.http.get<IQuote>(url).pipe(
      catchError(err => this.handleError(err)),
      map(quoteDto => new Quote(quoteDto))
    );
  }

  public showError(error: string) {
    this.errorService.notification.next(error);
  }

  public getAllProducts(): Observable<IProduct[]> {
    return this.productService.getAllProducts();
  }

  public updateQuoteState(quoteId: number, newStateKey: string) {

    const url = `${this.quotesUrl}/${quoteId}/state`;

    return this.http.put<any>(url, newStateKey)
      .pipe(catchError(err => this.handleError(err)));
  }

  public saveQuote(quote: Quote) {

    if (quote.id) {
      return this.http.put<any>(this.quotesUrl, quote)
        .pipe(catchError(err => this.handleError(err)));
    } else {
      return this.http.post<any>(this.quotesUrl, quote)
        .pipe(catchError(err => this.handleError(err)));
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

  private handleError(error: HttpErrorResponse) {
    this.errorService.showError(error);
    return throwError(error);
  }

}

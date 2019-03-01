import { Injectable } from '@angular/core';
import { IQuote } from '../model/interfaces/quote.interface';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/interfaces/page.interface';

@Injectable()
export class QuotesService {

  constructor(private http: HttpClient) { }

  public getQuotes(page: number, size: number) {

    const url = `http://localhost:8080/quote/?page=${page}&size=${size}`;

    return this.http.get<IPage<IQuote>>(url);
  }
}

import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Quote } from './../../model/quote.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { IQuoteLine } from 'src/app/model/interfaces/quote-line.interface';
import * as _ from 'lodash';
import { QuoteLine } from 'src/app/model/quote-line';

@Component({
  selector: 'app-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.scss']
})
export class QuoteEditComponent implements OnInit {

  public quote$: Observable<Quote>;
  public ready = false;
  private products = [];
  public productNames = [];

  lines: QuoteLine[];

  quoteForm = new FormGroup({
    id: new FormControl(),
    date: new FormControl(),
    comments: new FormControl(),
    deliveryTime: new FormControl(),
    total: new FormControl(),
    taxes: new FormControl(),
    state: new FormControl(),
    client: new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      company: new FormControl(),
      email: new FormControl(),
      phone: new FormControl()
    })
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: QuotesService) { }

  ngOnInit() {

    this.quote$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getQuoteById(params.get('id')))
    );

    this.quote$.subscribe( quote => {
      if (quote) {
        this.setFormValues(quote);
      }
    });

    this.service.getAllProducts().subscribe( products => {
      const sortedProducts = _.sortBy(products, ['name', 'color', 'reference']);
      this.products = sortedProducts;
    });

  }

  public goBack() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  private setFormValues(quote: Quote) {
    this.lines = quote.lines;
    delete quote.lines;
    this.quoteForm.setValue(quote);
    this.ready = true;
  }

  public getTotal() {
    if (!this.lines) {
      return 0;
    }
    return this.lines.reduce( (previous, current) => previous + current.total, 0);
  }

}

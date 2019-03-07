import { Taxes, TaxesLabels } from './../../model/enums/taxes';
import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Quote } from './../../model/quote.model';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { QuoteLine } from 'src/app/model/quote-line';

@Component({
  selector: 'app-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.scss']
})
export class QuoteEditComponent implements OnInit {

  public quote$ = new Subject<Quote>();
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
      id: new FormControl(),
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

    this.route.paramMap.subscribe( params => {
      this.service.getQuoteById(params.get('id')).subscribe( quote => {
        this.quote$.next(quote);
      });
    });

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
    this.lines = _.sortBy(quote.lines, ['lineNumber']);
    this.renumberLines();
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

  private renumberLines() {
    this.lines.forEach( (line, index) => {
      line.lineNumber = index;
    });
  }

  public addLine() {
    const maxLineNumber = this.lines.reduce( (previous, current) => previous > current.lineNumber ? previous : current.lineNumber, 1);
    this.lines.push(new QuoteLine({lineNumber: maxLineNumber + 1}));
  }

  public removeLine(index: number) {
    setTimeout( () => {
      this.lines.splice(index, 1);
      this.renumberLines();
    }, 150);
  }

  public save() {
    const quoteToSave = this.quoteForm.value;
    quoteToSave.lines = this.lines;
    this.service.saveQuote(quoteToSave).subscribe( () => {
      this.goBack();
    }, error => this.service.handleError(error) );
  }

  public getTaxesKeys() {
    return Object.keys(Taxes);
  }

  public getTaxesLabel(key: string) {
    return TaxesLabels[key];
  }

}

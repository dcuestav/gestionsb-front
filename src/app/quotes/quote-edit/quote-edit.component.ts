import { QuoteState, QuoteStateLabels } from './../../model/enums/quote-state';
import { Taxes, TaxesLabels } from './../../model/enums/taxes';
import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote } from './../../model/quote.model';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { QuoteLine } from 'src/app/model/quote-line';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.scss']
})
export class QuoteEditComponent implements OnInit {

  public quote$ = new BehaviorSubject<Quote>(new Quote({}));
  public quoteStateLabel$ = this.quote$.pipe( map(quote => QuoteStateLabels[quote.state]) );
  public quoteStateEditable$ = this.quote$.pipe( map(quote => quote.state === QuoteState.EDITABLE) );

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
      const quoteId = params.get('id');
      if (!quoteId || isNaN(Number(quoteId))) {
        return;
      }
      this.service.getQuoteById(quoteId).subscribe( quote => {
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
    if (quoteToSave.state !== QuoteState.EDITABLE ||
      quoteToSave.state !== QuoteState.EDITABLE.toString()) {
        this.service.showError('Este presupuesto no se puede modificar');
        return;
    }
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

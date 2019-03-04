import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Quote } from './../../model/quote.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { IQuoteLine } from 'src/app/model/interfaces/quote-line.interface';

@Component({
  selector: 'app-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.scss']
})
export class QuoteEditComponent implements OnInit {

  public quote$: Observable<Quote>;
  public ready = false;

  lines = new FormArray([]);

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
    }),
    lines: this.lines
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

  }

  public goBack() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  private setFormValues(quote: Quote) {
    for (let line of quote.lines) {
      const lineFormGroup = this.buildFormLineToForm(line);
      this.lines.push(lineFormGroup);
    }
    this.quoteForm.setValue(quote);
    this.ready = true;
  }

  private buildFormLineToForm(line: IQuoteLine) {
    return new FormGroup({
      lineNumber: new FormControl(line.lineNumber),
      productReference: new FormControl(line.productReference),
      productName: new FormControl(line.productName),
      productColor: new FormControl(line.productColor),
      productSize: new FormControl(line.productSize),
      productComments: new FormControl(line.productComments),
      productPrice: new FormControl(line.productPrice),
      quantity: new FormControl(line.quantity)
    });
  }

}

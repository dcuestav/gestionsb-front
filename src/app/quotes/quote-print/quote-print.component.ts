import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from '../quotes.service';
import { BehaviorSubject } from 'rxjs';
import { Quote } from 'src/app/model/quote.model';
import { TaxesLabels } from 'src/app/model/enums/taxes';

@Component({
  selector: 'app-quote-print',
  templateUrl: './quote-print.component.html',
  styleUrls: ['./quote-print.component.scss']
})
export class QuotePrintComponent implements OnInit, AfterViewInit {

  public quote = new Quote({});

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
        this.quote = quote;
      });
    });

  }

  ngAfterViewInit(): void {
    window.print();
  }

  public goBack() {
    history.back();
  }

  public getTaxesLabel() {
    return TaxesLabels[this.quote.taxes];
  }
}

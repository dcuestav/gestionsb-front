import { QuoteLine } from './quote-line';
import { IQuote } from './interfaces/quote.interface';
import { IQuoteClient } from './interfaces/quote-client.interface';
import { Taxes } from './enums/taxes';
import { QuoteState } from './enums/quote-state';

export class Quote {

    id: number;
    date: Date;
    comments: string;
    deliveryTime: string;
    taxes: Taxes;
    state: QuoteState;
    total: number;
    client: IQuoteClient;
    lines: QuoteLine[];

    constructor(quoteDTO: IQuote) {
        this.id = quoteDTO.id;
        this.date = new Date(quoteDTO.date);
        this.comments = quoteDTO.comments;
        this.deliveryTime = quoteDTO.deliveryTime;
        this.taxes = Taxes[quoteDTO.taxes];
        this.state = QuoteState[quoteDTO.state];
        this.total = quoteDTO.total;
        this.client = quoteDTO.client;
        this.lines = quoteDTO.lines ? quoteDTO.lines.map( lineDTO => new QuoteLine(lineDTO)) : [];
    }

    public getRowClass() {
        const stateValue = Object.keys(QuoteState).find( key => QuoteState[key] === this.state );
        return stateValue ? `row-${stateValue.toLowerCase()}` : '';
    }
}

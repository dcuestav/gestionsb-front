import { IQuote } from './interfaces/quote.interface';
import { IQuoteClient } from './interfaces/quote-client.interface';

export class Quote {

    id: number;
    date: Date;
    comments: string;
    deliveryTime: string;
    taxes: string;
    state: string;
    total: number;
    client: IQuoteClient;

    constructor(quoteDTO: IQuote) {
        this.id = quoteDTO.id;
        this.date = new Date(quoteDTO.date);
        this.comments = quoteDTO.comments;
        this.deliveryTime = quoteDTO.deliveryTime;
        this.taxes = quoteDTO.taxes;
        this.state = quoteDTO.state;
        this.total = quoteDTO.total;
        this.client = quoteDTO.client;
    }
}
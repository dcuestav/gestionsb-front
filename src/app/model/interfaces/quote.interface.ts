import { IQuoteClient } from './quote-client.interface';

export interface IQuote {

    id: number;
    date: string;
    comments: string;
    deliveryTime: string;
    taxes: string;
    state: string;
    total: number;
    client: IQuoteClient;
}
import { IQuoteClient } from './quote-client.interface';
import { IQuoteLine } from './quote-line.interface';

export interface IQuote {
    id: number;
    date: string;
    comments: string;
    deliveryTime: string;
    taxes: string;
    state: string;
    total: number;
    client: IQuoteClient;
    lines: IQuoteLine[];
}
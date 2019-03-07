import { QuoteLine } from './quote-line';
import { IQuote } from './interfaces/quote.interface';
import { Taxes } from './enums/taxes';
import { QuoteState } from './enums/quote-state';
import { QuoteClient } from './quote-client';

export class Quote {

    id: number;
    date: Date;
    comments: string;
    deliveryTime: string;
    taxes: Taxes;
    state: QuoteState;
    total: number;
    client: QuoteClient;
    lines: QuoteLine[];

    constructor(quoteDTO: IQuote) {
        this.id = quoteDTO.id ? quoteDTO.id : null;
        this.date = quoteDTO.date ? new Date(quoteDTO.date) : new Date();
        this.comments = quoteDTO.comments ? quoteDTO.comments : '';
        this.deliveryTime = quoteDTO.deliveryTime ? quoteDTO.deliveryTime : '';
        this.taxes = quoteDTO.taxes ? Taxes[quoteDTO.taxes] : Taxes.CON_IVA;
        this.state = quoteDTO.state ? QuoteState[quoteDTO.state] : QuoteState.EDITABLE;
        this.total = quoteDTO.total ? quoteDTO.total : 0;
        this.client = quoteDTO.client ? new QuoteClient(quoteDTO.client) : new QuoteClient({});
        if (quoteDTO.lines && quoteDTO.lines.length) {
            this.lines = quoteDTO.lines.map( lineDTO => new QuoteLine(lineDTO));
            this.recalculateTotal();
        } else  {
            this.lines = [];
            this.lines.push(new QuoteLine({}));
        }
    }

    public getRowClass() {
        const stateValue = Object.keys(QuoteState).find( key => QuoteState[key] === this.state );
        return stateValue ? `row-${stateValue.toLowerCase()}` : '';
    }

    public isEditable() {
        return this.state === QuoteState.EDITABLE;
    }

    public recalculateTotal() {
        this.total = this.lines.reduce( (previous, current) => previous + current.total, 0 );
    }

    public getTotalWithoutTaxes() {
        const value = (this.taxes === Taxes.SIN_IVA) ? this.total : this.total / 1.21;
        return Math.round(value * 100) / 100;
    }

    public getTotalWithTaxes() {
        const value = (this.taxes === Taxes.CON_IVA) ? this.total : this.total * 1.21;
        return Math.round(value * 100) / 100;
    }

    public getTotalTaxes() {
        return this.getTotalWithTaxes() - this.getTotalWithoutTaxes();
    }
}

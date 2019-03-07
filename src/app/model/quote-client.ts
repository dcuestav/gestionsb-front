import { IQuoteClient } from './interfaces/quote-client.interface';

export class QuoteClient {

    id: number;
    name: string;
    address: string;
    company: string;
    email: string;
    phone: string;

    constructor( clientDTO: IQuoteClient) {
        this.id = clientDTO.id ? clientDTO.id : null;
        this.name = clientDTO.name ? clientDTO.name : '';
        this.address = clientDTO.address ? clientDTO.address : '';
        this.company = clientDTO.company ? clientDTO.company : '';
        this.email = clientDTO.email ? clientDTO.email : '';
        this.phone = clientDTO.phone ? clientDTO.phone : '';
    }
}
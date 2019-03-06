import { IQuoteLine } from './interfaces/quote-line.interface';

export class QuoteLine {
    id: number;
    lineNumber: number;
    productReference: string;
    productName: string;
    productColor: string;
    productSize: string;
    productComments: string;
    productPrice: number;
    quantity: number;

    constructor(lineDTO: IQuoteLine) {
        this.id = lineDTO.id;
        this.lineNumber = lineDTO.lineNumber;
        this.productReference = lineDTO.productReference ? lineDTO.productReference : '';
        this.productName = lineDTO.productName ? lineDTO.productName : '';
        this.productColor = lineDTO.productColor ? lineDTO.productColor : '';
        this.productSize = lineDTO.productSize ? lineDTO.productSize : '';
        this.productComments = lineDTO.productComments ? lineDTO.productComments : '';
        this.productPrice = lineDTO.productPrice ? lineDTO.productPrice : 0;
        this.quantity = lineDTO.quantity ? lineDTO.quantity : 1;
    }

    get total() {
        return this.quantity * this.productPrice;
    }
 }
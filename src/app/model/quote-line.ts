import { IQuoteLine } from './interfaces/quote-line.interface';

export class QuoteLine {
    lineNumber: number;
    productReference: string;
    productName: string;
    productColor: string;
    productSize: string;
    productComments: string;
    productPrice: number;
    quantity: number;

    constructor(lineDTO: IQuoteLine) {
        this.lineNumber = lineDTO.lineNumber;
        this.productReference = lineDTO.productReference;
        this.productName = lineDTO.productName;
        this.productColor = lineDTO.productColor;
        this.productSize = lineDTO.productSize;
        this.productComments = lineDTO.productComments;
        this.productPrice = lineDTO.productPrice;
        this.quantity = lineDTO.quantity;
    }

    get total() {
        return this.quantity * this.productPrice;
    }
 }
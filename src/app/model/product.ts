import { IProduct } from './interfaces/product.interface';

export class Product {
    idProduct: number;
    idProductAttribute: number;
    reference: string;
    name: string;
    color: string;
    size: string;
    price: number;
    cost: number;
    weight: number;
    currentStock: number;

    constructor(product: IProduct) {
        for (const property in product) {
            if (product.hasOwnProperty(property)) {
                this[property] = product[property];
            }
        }
    }

}

import { IProduct } from './../../../model/interfaces/product.interface';
export class IStockMovement {
    id: number;
    idStock: number;
    idOrder: number;
    reasonId: number;
    reason: string;
    quantity: number;
    date: string;
    product: IProduct;
    sign: number;
}

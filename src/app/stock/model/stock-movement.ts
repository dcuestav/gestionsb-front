import { IStockMovement } from './interfaces/stock-movement.interface';
import { Product } from 'src/app/model/product';

export class StockMovement {
    id: number;
    idStock: number;
    idOrder: number;
    reasonId: number;
    reason: string;
    sign: number;
    quantity: number;
    date: Date;
    product: Product;

    constructor(mvtDTO: IStockMovement) {
        this.id = mvtDTO.id;
        this.idStock = mvtDTO.idStock;
        this.idOrder = mvtDTO.idOrder;
        this.reasonId = mvtDTO.reasonId;
        this.reason = mvtDTO.reason;
        this.quantity = mvtDTO.quantity;
        this.sign = mvtDTO.sign;
        this.date = new Date(mvtDTO.date);
        this.product = mvtDTO.product ? new Product(mvtDTO.product) : null;
    }

    get signedQuantity() {
        return this.sign === -1 ? -this.quantity : this.quantity;
    }
}

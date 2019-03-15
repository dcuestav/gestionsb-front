import { StockProductVariation } from './stock-variation';

export class StockIncrements {

    private increments = [];

    set(key: number, value: number) {
        this.increments[key] = value;
        this.deleteIfZero(key);
    }

    get(key: number): number {
        if (this.increments[key]) {
            return this.increments[key];
        }
        return 0;
    }

    has(key: number): boolean {
        if (this.increments[key]) {
            return true;
        }
        return false;
    }

    clear() {
        this.increments = [];
    }

    hasChanges() {
        return Object.keys(this.increments).length > 0;
    }

    getStockIds() {
        return Object.keys(this.increments);
    }

    getRequestObject(): StockProductVariation[] {
        return this.getStockIds().map( key => (
            { stockId: Number(key),
              increment: this.get(Number(key)) }) );
    }

    private deleteIfZero(key: number) {
        if (this.increments[key] === 0) {
            delete this.increments[key];
        }
    }

}

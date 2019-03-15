export interface StockProductVariation {
    stockId: number;
    increment: number;
}

export interface StockVariation {
    customReason?: string;
    stockIncrements: StockProductVariation[];
}

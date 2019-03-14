export interface IProduct {
    idStock?: number;
    idProduct?: number;
    idProductAttribute?: number;
    reference?: string;
    name: string;
    color?: string;
    size?: string;
    price?: number;
    cost?: number;
    weight?: number;
    currentStock?: number;
}
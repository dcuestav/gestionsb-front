import { ICategory } from './interfaces/category.interface';

export class Category {

    id: number;
    name: string;

    constructor(category: ICategory) {
        for (const property in category) {
            if (category.hasOwnProperty(property)) {
                this[property] = category[property];
            }
        }
    }

    
}

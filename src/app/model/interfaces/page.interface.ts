export interface IPage<T> {
    page: number;
    size: number;
    totalElements: number;
    elements: T[];
}
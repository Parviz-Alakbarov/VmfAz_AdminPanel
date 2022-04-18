export interface ProductUpdateDto{
    name:string;
    salePrice:number;
    costPrice:number;
    discountPercent:number;
    description:string;
    posterImage:File;
}
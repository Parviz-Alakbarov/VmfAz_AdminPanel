export interface ProductGetDtoAdmin{
    id:number;
    name:string;
    brandId:number;
    genderId:number;
    salePrice:number;
    costPrice:number;
    discountPersent:number;
    image:string;
    createDate:Date;
    isDeleted:boolean;
}
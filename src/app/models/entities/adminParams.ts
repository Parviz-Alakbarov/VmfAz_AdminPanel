export class AdminParams{
    minPrice:number;
    maxPrice:number;
    isDeleted:boolean = false; 
    orderBy:string;

    pageNumber:number = 1 ;
    pageSize: number;
}
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductAddDto } from '../models/dtos/productDtos/productAddDto';
import { ProductDetailDto } from '../models/dtos/productDtos/productDetailDto';
import { ProductGetDto } from '../models/dtos/productDtos/productGetDto';
import { ProductUpdateDto } from '../models/dtos/productDtos/productUpdateDto';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { SingleResponseModel } from './../models/responses/singleResponseModel';
import { Product } from './../models/entities/product';
import { ResponseModel } from '../models/responses/responseModel';
import { AdminParams } from '../models/entities/adminParams';
import { PaginationResponseModel } from '../models/responses/paginationResponseModel';
import { ProductGetDtoAdmin } from '../models/dtos/productDtos/productGetDtoAdmin';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.BASE_URL;

  constructor(
    private httpClient:HttpClient
  ) { }

  getProdcutsInGetDto():Observable<ListResponseModel<ProductGetDto>>{
    let newUrl = this.baseUrl+"api/products/";
    return this.httpClient.get<ListResponseModel<ProductGetDto>>(newUrl);
  }

  getProductDetail(id:number):Observable<SingleResponseModel<ProductDetailDto>>{
    let newUrl = this.baseUrl+`api/products/getProductDetail/${id}`;
    return this.httpClient.get<SingleResponseModel<ProductDetailDto>>(newUrl);
  }

  getProduct(productId:number):Observable<SingleResponseModel<Product>>{
    let newUrl = this.baseUrl+`api/products/getbyid/${productId}`;
    return this.httpClient.get<SingleResponseModel<Product>>(newUrl);
  }

  addProduct(product:FormData):Observable<ResponseModel>{
    let newUrl = this.baseUrl+"api/products/add";

    return this.httpClient.post<ResponseModel>(newUrl,product);
  }

  updateProduct(productId:number, product:ProductUpdateDto){
    let newUrl = this.baseUrl+`api/products/update/${productId}`;
    return this.httpClient.post(newUrl,product);
  }

  getProductImagePath(){
    return this.baseUrl+"images/products/";
  }

  deleteProduct(productId:number):Observable<ResponseModel>{
    let newUrl = this.baseUrl+ `api/products/delete/${productId}`;
    return this.httpClient.delete<ResponseModel>(newUrl);
  }

  getPaginatedProducts(adminParams:AdminParams){
    let params = this.getPaginationHeaders(adminParams.pageNumber)
    console.log(adminParams);
    
    if (adminParams.orderBy) {
      params = params.append('orderBy',adminParams.orderBy);
    }
    if (adminParams.pageSize) {
      params = params.append('pageSize', adminParams.pageSize);
    }
    if (adminParams.minPrice) {
      params = params.append('minPrice',adminParams.minPrice);
    }
    if (adminParams.maxPrice) {
      params = params.append('maxPrice',adminParams.maxPrice);
    }
    
    params = params.append('isDeleted', adminParams.isDeleted);
    let newUrl = this.baseUrl+"api/products/getpaginatedlistadmin";
    return this.httpClient.get<PaginationResponseModel<ProductGetDtoAdmin>>(newUrl,{observe:'response',params});
  }


  private getPaginationHeaders(pageNumber:number){
    let params = new HttpParams();
    params = params.append("pageNumber",pageNumber.toString());
    return params;
  }
}

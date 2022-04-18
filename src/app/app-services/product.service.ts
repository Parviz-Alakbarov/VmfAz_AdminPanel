import { HttpClient } from '@angular/common/http';
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



  addProduct(product:ProductAddDto){
    let newUrl = this.baseUrl+"api/products/add";
    return this.httpClient.post(newUrl,product);
  }

  updateProduct(productId:number, product:ProductUpdateDto){
    let newUrl = this.baseUrl+`api/products/update/${productId}`;
    return this.httpClient.post(newUrl,product);
  }




  getProductImagePath(){
    return this.baseUrl+"images/products/";
  }
}

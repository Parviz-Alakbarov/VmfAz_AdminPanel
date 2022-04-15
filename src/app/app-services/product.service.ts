import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductAddDto } from '../models/dtos/productDtos/productAddDto';
import { ProductGetDto } from '../models/dtos/productDtos/productGetDto';
import { ListResponseModel } from '../models/responses/listResponseModel';

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

  addProduct(product:ProductAddDto){
    let newUrl = this.baseUrl+"api/products/add";
    return this.httpClient.post(newUrl,product);
  }

  getProductImagePath(){
    return this.baseUrl+"images/products/";
  }
}

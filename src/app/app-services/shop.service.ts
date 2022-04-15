import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Shop } from '../models/entities/shop';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { ResponseModel } from '../models/responses/responseModel';
import { ShopPostDto } from '../models/dtos/shopDtos/shopPostDto';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl = environment.BASE_URL;

  constructor(
    private httpClient:HttpClient
  ) { }

  addShop(shop:ShopPostDto):Observable<ResponseModel>{
    let newUrl =  this.baseUrl+"api/shops/add";
    return this.httpClient.post<ResponseModel>(newUrl,shop);
  }

  getShops():Observable<ListResponseModel<Shop>>{
    let newUrl =  this.baseUrl+"api/shops";
    return this.httpClient.get<ListResponseModel<Shop>>(newUrl);
  }

  deleteShop(shopId:number){
    let newUrl =  this.baseUrl+`api/shops/delete/${shopId}`;
    return this.httpClient.delete(newUrl);
  }

}

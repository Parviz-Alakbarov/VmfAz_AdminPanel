import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BrandWithOnlyNameDto } from '../models/dtos/brandDtos/brandWithOnlyNameDto';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { SingleResponseModel } from './../models/responses/singleResponseModel';
import { BrandDetailDto } from './../models/dtos/brandDtos/brandDetailDto';
import { BrandWithImageDto } from '../models/dtos/brandDtos/brandWithImageDto';
import { BrandAddDto } from '../models/dtos/brandDtos/brandAddDto';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl = environment.BASE_URL;

  constructor(
    private httpClient:HttpClient
  ) { }


  getBrandImagePath(){
    return this.baseUrl+"images/brands/";
  }

  addBrand(brand:BrandAddDto){
    let newUrl = this.baseUrl+"api/brands/add";
    return this.httpClient.post(newUrl,brand);
  }

  getBrandsWithName():Observable<ListResponseModel<BrandWithOnlyNameDto>>{
    let newUrl = this.baseUrl+"api/brands/getbrandsonlywithname";
    return this.httpClient.get<ListResponseModel<BrandWithOnlyNameDto>>(newUrl);
  }

  getBrandWithImage():Observable<ListResponseModel<BrandWithImageDto>>{
    let newUrl = this.baseUrl+"api/brands/getbrandswithimage";
    return this.httpClient.get<ListResponseModel<BrandWithImageDto>>(newUrl);
  }

  getBrandDetail(brandId:number):Observable<SingleResponseModel<BrandDetailDto>>{
    let newUrl = this.baseUrl+`api/brands/getbrandDetail/${brandId}`;
    return this.httpClient.get<SingleResponseModel<BrandDetailDto>>(newUrl);
  }
}

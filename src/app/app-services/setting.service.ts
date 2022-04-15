import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductEntryDto } from '../models/dtos/productDtos/productEntryDto';
import { Color } from '../models/entities/color';
import { Country } from '../models/entities/country';
import { ListResponseModel } from '../models/responses/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private baseUrl = environment.BASE_URL;

  constructor(
    private httpClient:HttpClient
  ) { }

  getProductsFunctionalities():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductfunctionality";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getProductWaterResistances():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductwaterresistances";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getProductStyles():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductstyles";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getProductMechanisms():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductmechanisms";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getProductGlassTypes():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductglasstypes";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getProductCaseSizes():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductcasesizes";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getProductCaseShapes():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductcaseshapes";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getProductCaseMaterials():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductcasematerials";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getProductBeltTypes():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductbelttypes";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getGenders():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getgenders";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }

  getCountries():Observable<ListResponseModel<Country>>{
    let newUrl = this.baseUrl+"api/settings/getCountries";
    return this.httpClient.get<ListResponseModel<Country>>(newUrl);
  }

  getColors():Observable<ListResponseModel<Color>>{
    let newUrl = this.baseUrl+"api/settings/getcolors";
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }
  
}

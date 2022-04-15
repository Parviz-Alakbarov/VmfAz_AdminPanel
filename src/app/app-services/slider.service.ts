import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Slider } from '../models/entities/slider';
import { ListResponseModel } from './../models/responses/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from './../models/responses/responseModel';
import { SliderPostDto } from '../models/dtos/sliderDtos/sliderPostDto';
import { SingleResponseModel } from './../models/responses/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private baseUrl = environment.BASE_URL;

  constructor(
    private httpClient:HttpClient
  ) { }


  addSlider(slider:SliderPostDto):Observable<ResponseModel>{
    let newUrl = this.baseUrl+"api/sliders" 
    return this.httpClient.post<ResponseModel>(newUrl,slider);
  }

  deleteSlider(id:number){
    let newUrl = this.baseUrl+`api/sliders/${id}`;
    this.httpClient.delete(newUrl);
  }

  getSliders():Observable<ListResponseModel<Slider>>{
    let newUrl = this.baseUrl+"api/sliders" 
    return this.httpClient.get<ListResponseModel<Slider>>(newUrl);
  }

  getSlider(id:number):Observable<SingleResponseModel<Slider>>{
    let newUrl = this.baseUrl+`api/sliders/getbyid/${id}`;
    return this.httpClient.get<SingleResponseModel<Slider>>(newUrl);
  }

  getSlidersImagePath(){
    return this.baseUrl+"images/sliders/";
  }

}

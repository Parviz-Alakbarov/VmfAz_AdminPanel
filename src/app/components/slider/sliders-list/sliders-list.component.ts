import { Component, OnInit } from '@angular/core';
import { SliderService } from './../../../app-services/slider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Slider } from 'src/app/models/entities/slider';

@Component({
  selector: 'app-sliders-list',
  templateUrl: './sliders-list.component.html',
  styleUrls: ['./sliders-list.component.scss']
})
export class SlidersListComponent implements OnInit {

  sliders:Slider[]=[];

  constructor(
    private sliderService:SliderService,
    private spinner:NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getSliders();
  }

  getSliders(){
    this.spinner.show();
    this.sliderService.getSliders().subscribe(response=>{
      this.sliders = response.data;
      this.spinner.hide();
    },errorResponse=>{
      console.log(errorResponse);
    })
  }

  getSliderImagePath(imageName:string){
    return this.sliderService.getSlidersImagePath()+imageName;
  }

}

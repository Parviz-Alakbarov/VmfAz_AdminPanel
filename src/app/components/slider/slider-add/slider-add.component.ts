import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidationErrorResponseModel } from 'src/app/models/responses/validationErrorResponseModel';
import { SliderService } from './../../../app-services/slider.service';


@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.scss']
})
export class SliderAddComponent implements OnInit {

  sliderAdd:FormGroup;
  validationErrors:ValidationErrorResponseModel[]=[];

  constructor(
    private formBuilder:FormBuilder,
    private sliderService:SliderService,
    private toastrService:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.createSliderAddForm();
  }

  createSliderAddForm(){
    this.sliderAdd = this.formBuilder.group({
      order:["",[Validators.required,Validators.min(1),Validators.max(49)]],
      image:["",[Validators.required]],
      redirectUrl:["",[Validators.required,Validators.maxLength(1000)]],
    })
  }



  addSlider(el : HTMLElement){
    
    if (this.sliderAdd.valid) {
      this.spinner.show();
      let sliderModel  =  Object.assign({}, this.sliderAdd.value)
      this.sliderService.addSlider(sliderModel).subscribe(data=>{
        this.spinner.hide();
        this.toastrService.success('Slider Added', 'Success')
        this.router.navigateByUrl('/sliders')
      });
    }else{
      this.toastrService.error("Form is not Valid!", 'Fail', { timeOut: 1000 })
      for (const key in this.sliderAdd.controls) {
        if (this.sliderAdd.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>this.sliderAdd.controls[key];
          control.markAsTouched();
        }
      }
      el.scrollIntoView({behavior: 'smooth'})
    }
  }
}

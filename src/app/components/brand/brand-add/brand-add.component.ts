import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/app-services/brand.service';
import { ValidationErrorResponseModel } from 'src/app/models/responses/validationErrorResponseModel';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAdd:FormGroup;
  validationErrors:ValidationErrorResponseModel[]=[];
  ImageFile:File = null;
  PosterImageFile:File = null;

  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAdd = this.formBuilder.group({
      name:["",[Validators.required,Validators.maxLength(50)]],
      description:["",[Validators.required,Validators.maxLength(2000)]],
      image:["",[Validators.required]],
      posterImage:["",[Validators.required]],

    })
  }

  addBrand(el:HTMLElement){
    if (this.brandAdd.valid) {
      this.spinner.show();
      let brandModule  =  Object.assign({}, this.brandAdd.value)
      this.brandService.addBrand(brandModule).subscribe(data=>{
        this.spinner.hide();
        this.toastrService.success('Product Added', 'Success')
        this.router.navigateByUrl('/brands')
      });
    }else{
      this.toastrService.error("Form is not Valid!", 'Fail', { timeOut: 1000 })
      for (const key in this.brandAdd.controls) {
        if (this.brandAdd.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>this.brandAdd.controls[key];
          control.markAsTouched();
        }
      }
      el.scrollIntoView({behavior: 'smooth'})
    }
  }





  onImageSelected(event){
    if (event.target.files.length > 0) {
      this.ImageFile = event.target.files[0];
    }
  }

  onPosterImageSelected(event){
    if (event.target.files.length > 0) {
      this.PosterImageFile = event.target.files[0];
    }
  }


}




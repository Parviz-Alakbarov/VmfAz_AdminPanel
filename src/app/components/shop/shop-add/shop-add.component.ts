import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from 'src/app/app-services/shop.service';
import { ShopPostDto } from 'src/app/models/dtos/shopDtos/shopPostDto';
import { ValidationErrorResponseModel } from 'src/app/models/responses/validationErrorResponseModel';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.scss']
})
export class ShopAddComponent implements OnInit {
  shopAdd:FormGroup;
  validationErrors:ValidationErrorResponseModel[]=[];

  constructor(
    private formBuilder:FormBuilder,
    private shopService:ShopService,
    private toastrService:ToastrService,
    private spinner:NgxSpinnerService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.createShopAddForm();
  }

  createShopAddForm(){
    this.shopAdd = this.formBuilder.group({
      name:["",[Validators.required,Validators.maxLength(50)]],
      email:["",[Validators.required,Validators.maxLength(100)]],
      phoneNumber1:["",[Validators.required,Validators.maxLength(15)]],
      phoneNumber2:["",[Validators.maxLength(15)]],
      address:["",[Validators.required,Validators.maxLength(500)]],
      openHour:["",[Validators.required]],
      closeHour:["",[Validators.required]],
      openMinute:["",[Validators.required]],
      closeMinute:["",[Validators.required]],
      redirectUrl:["",[Validators.required,Validators.maxLength(100)]],
      longitude:["",[Validators.required,Validators.pattern("^\\d{0,9}(\\.\\d{0,6})?$")]],
      latitude:["",[Validators.required,Validators.pattern("^\\d{0,9}(\\.\\d{0,6})?$")]],

    })
  }



  addShop(el : HTMLElement){
    
    if (this.shopAdd.valid) {
      this.spinner.show();
      let shopModel  =  Object.assign({}, this.shopAdd.value)
      this.shopService.addShop(shopModel).subscribe(response=>{
        console.log(response);
        
        this.spinner.hide();
        console.log(")$)$)$)$)$)$)$))$))$)$)$)$)$)$)$)$)");
        
        this.toastrService.success(response.message, 'Success')
        this.router.navigateByUrl('/shops')
        error=>{
          console.log(error);
        }
        
      });
    }else{
      this.toastrService.error("Form is not Valid!", 'Fail', { timeOut: 1000 })
      for (const key in this.shopAdd.controls) {
        if (this.shopAdd.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>this.shopAdd.controls[key];
          control.markAsTouched();
        }
      }
      el.scrollIntoView({behavior: 'smooth'})
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilderService } from 'src/app/app-services/form-builder.service';
import { ShopService } from 'src/app/app-services/shop.service';
import { Shop } from 'src/app/models/entities/shop';
import { ValidationErrorResponseModel } from 'src/app/models/responses/validationErrorResponseModel';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {
  shopEditForm:FormGroup;
  shop:Shop;

  validationErrors:ValidationErrorResponseModel[]=[];


  constructor(
    private formService: FormBuilderService,
    private spinner:NgxSpinnerService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private shopService:ShopService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getShop(params["shopId"]);
    });


    this.createProductUpdateForm();

  }



  edit(el : HTMLElement){
    if (this.shopEditForm.valid) {
      this.spinner.show();
      let shopModel  =  Object.assign({}, this.shopEditForm.value)

      this.shopService.updateShop(this.shop.id,shopModel).subscribe(data=>{
        this.spinner.hide();
        this.toastrService.success('Product Added', 'Success')
        this.router.navigateByUrl('/products')
      });
    }else{
      this.toastrService.error("Form is not Valid!", 'Fail', { timeOut: 1000 })
      for (const key in this.shopEditForm.controls) {
        if (this.shopEditForm.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>this.shopEditForm.controls[key];
          control.markAsTouched();
        }
      }
      el.scrollIntoView({behavior: 'smooth'})
    }
  }

  getShop(id:number){
    this.shopService.getShop(id).subscribe(response=>{
      this.shop= response.data;
    })
  }


  private createProductUpdateForm() {
    this.shopEditForm = this.formService.createProductUpdateForm();
  }
}

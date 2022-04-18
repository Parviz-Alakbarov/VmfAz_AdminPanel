import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilderService } from 'src/app/app-services/form-builder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/app-services/product.service';
import { BrandWithOnlyNameDto } from 'src/app/models/dtos/brandDtos/brandWithOnlyNameDto';
import { ProductEntryDto } from 'src/app/models/dtos/productDtos/productEntryDto';
import { Country } from 'src/app/models/entities/country';
import { Color } from 'src/app/models/entities/color';
import { SettingService } from 'src/app/app-services/setting.service';
import { BrandService } from 'src/app/app-services/brand.service';
import { ProductDetailDto } from 'src/app/models/dtos/productDtos/productDetailDto';
import { ValidationErrorResponseModel } from 'src/app/models/responses/validationErrorResponseModel';
import { Product } from 'src/app/models/entities/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productEditForm:FormGroup;
  product:Product;
  selectedFile:File = null;

  validationErrors:ValidationErrorResponseModel[]=[];

  constructor(
    private formService: FormBuilderService,
    private spinner:NgxSpinnerService,
    private toastrService:ToastrService,
    private router:Router,
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private settingService:SettingService,
    private brandService:BrandService,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getProduct(params["productId"]);
    });

    this.createProductUpdateForm();
  }

  edit(el : HTMLElement){
    if (this.productEditForm.valid) {
      this.spinner.show();
      let productModel  =  Object.assign({}, this.productEditForm.value)

      this.productService.updateProduct(this.product.id,productModel).subscribe(data=>{
        this.spinner.hide();
        this.toastrService.success('Product Added', 'Success')
        this.router.navigateByUrl('/products')
      });
    }else{
      this.toastrService.error("Form is not Valid!", 'Fail', { timeOut: 1000 })
      for (const key in this.productEditForm.controls) {
        if (this.productEditForm.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>this.productEditForm.controls[key];
          control.markAsTouched();
        }
      }
      el.scrollIntoView({behavior: 'smooth'})
    }
  }

  getProduct(id:number){
    this.spinner.show();
    this.productService.getProduct(id).subscribe(response=>{
      this.product= response.data;
      this.createProductUpdateForm();
      this.spinner.hide();
    },errorResponse=>{
      this.spinner.hide();
      console.log(errorResponse);
      
    })
  }

  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName;
  }

  onFileSelected(event){
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  private createProductUpdateForm() {
    this.productEditForm = this.formBuilder.group({
      name:[this.product.name,[Validators.required,Validators.maxLength(100)]],
      salePrice:[this.product.salePrice,[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      costPrice:[this.product.costPrice,[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      discountPercent:[this.product.discountPercent,[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0),Validators.max(100)]],
      description:[this.product.description,[Validators.required,Validators.maxLength(1000)]],
      posterImage:[this.product.posterImage,[Validators.required]]
    });
  }

}

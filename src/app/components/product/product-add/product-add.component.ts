import { Component, OnInit } from '@angular/core';
import { BrandService } from './../../../app-services/brand.service';
import { ProductEntryDto } from './../../../models/dtos/productDtos/productEntryDto';
import { ProductService } from './../../../app-services/product.service';
import { SettingService } from './../../../app-services/setting.service';
import { BrandWithOnlyNameDto } from './../../../models/dtos/brandDtos/brandWithOnlyNameDto';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Country } from './../../../models/entities/country';
import { Color } from './../../../models/entities/color';
import { ToastrService } from 'ngx-toastr';
import { ValidationErrorResponseModel } from '../../../../app/models/responses/validationErrorResponseModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAdd:FormGroup;
  validationErrors:ValidationErrorResponseModel[]=[];

  brands:BrandWithOnlyNameDto[];
  functionalities:ProductEntryDto[];
  waterResistances:ProductEntryDto[];
  styles:ProductEntryDto[];
  mechanisms:ProductEntryDto[];
  glassTypes:ProductEntryDto[];
  caseSizes:ProductEntryDto[];
  caseShapes:ProductEntryDto[];
  caseMaterials:ProductEntryDto[];
  beltTypes:ProductEntryDto[];
  genders:ProductEntryDto[];
  countries:Country[];
  colors:Color[];

  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private brandService:BrandService,
    private settingService:SettingService,
    private toastrService:ToastrService,
    private spinner:NgxSpinnerService,
    private router:Router,

  ) { }

  ngOnInit(): void {
    this.createProductAddForm();

    this.getBrands();
    this.getFunctionalities();
    this.getProductWaterResistances();
    this.getProductStyles();
    this.getProductMechanisms();
    this.getProductGlassTypes();
    this.getProductCaseSizes();
    this.getProductCaseShapes();
    this.getProductCaseMaterials();
    this.getProductBeltTypes();
    this.getGenders();
    this.getCountries();
    this.getColors();
  }

  createProductAddForm(){
    this.productAdd = this.formBuilder.group({
      name:["",[Validators.required,Validators.maxLength(100)]],
      brandId:["",[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      genderId:["",[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      salePrice:["",[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      costPrice:["",[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      discountPercent:["",[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0),Validators.max(100)]],
      description:["",[Validators.required,Validators.maxLength(1000)]],
      warrantyLimit:["",[Validators.required,Validators.min(0)]],
      //
      productFunctionalityId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productStyleId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productWaterResistanceId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      countryId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productMechanismId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productGlassTypeId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      /////////////////////
      productCaseMaterialId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productCaseShapeId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productBeltTypeId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productCaseSizeId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productBeltColorId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productDialColorId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      toolCount:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],

    })
  }

  addProduct(el : HTMLElement){
    
    if (this.productAdd.valid) {
      this.spinner.show();
      let productModel  =  Object.assign({}, this.productAdd.value)
      this.productService.addProduct(productModel).subscribe(data=>{
        this.spinner.hide();
        this.toastrService.success('Product Added', 'Success')
        this.router.navigateByUrl('/products')
      });
    }else{
      this.toastrService.error("Form is not Valid!", 'Fail', { timeOut: 1000 })
      for (const key in this.productAdd.controls) {
        if (this.productAdd.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>this.productAdd.controls[key];
          control.markAsTouched();
        }
      }
      el.scrollIntoView({behavior: 'smooth'})
    }
  }


  getBrands(){
    this.brandService.getBrandsWithName().subscribe(response=>{
      this.brands = response.data;
    })
  }

  getFunctionalities(){
    this.settingService.getProductsFunctionalities().subscribe(response=>{
      this.functionalities = response.data;
    })
  }

  getProductWaterResistances(){
    this.settingService.getProductWaterResistances().subscribe(response=>{
      this.waterResistances = response.data;
    })
  }

  getProductStyles(){
    this.settingService.getProductStyles().subscribe(response=>{
      this.styles = response.data;
    })
  }

  getProductMechanisms(){
    this.settingService.getProductMechanisms().subscribe(response=>{
      this.mechanisms = response.data;
    })
  }

  getProductGlassTypes(){
    this.settingService.getProductsFunctionalities().subscribe(response=>{
      this.glassTypes = response.data;
    })
  }

  getProductCaseSizes(){
    this.settingService.getProductCaseSizes().subscribe(response=>{
      this.caseSizes = response.data;
    })
  }

  getProductCaseShapes(){
    this.settingService.getProductCaseShapes().subscribe(response=>{
      this.caseShapes = response.data;
    })
  }

  getProductCaseMaterials(){
    this.settingService.getProductCaseMaterials().subscribe(response=>{
      this.caseMaterials = response.data;
    })
  }

  getProductBeltTypes(){
    this.settingService.getProductBeltTypes().subscribe(response=>{
      this.beltTypes = response.data;
    })
  }

  getGenders(){
    this.settingService.getGenders().subscribe(response=>{
      this.genders = response.data;
    })
  }

  getCountries(){
    this.settingService.getCountries().subscribe(response=>{
      this.countries = response.data;
    })
  }

  getColors(){
    this.settingService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }
}

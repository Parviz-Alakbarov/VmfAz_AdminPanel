import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(
    private formBuilder: FormBuilder,
  ) { }



  createProductAddForm():FormGroup{
    return this.formBuilder.group({
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
      //
      productCaseMaterialId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productCaseShapeId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productBeltTypeId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productCaseSizeId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productBeltColorId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      productDialColorId:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      toolCount:[null,[Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      posterImage:[null,[Validators.required]]
    })
  }


  createProductUpdateForm():FormGroup{
    return this.formBuilder.group({
      name:["",[Validators.required,Validators.maxLength(100)]],
      salePrice:["",[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      costPrice:["",[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      discountPercent:["",[Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(0),Validators.max(100)]],
      description:["",[Validators.required,Validators.maxLength(1000)]],
      posterImage:[null,[Validators.required]]
    })
  }


  createColorForm(): FormGroup {
    return this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    })
  }
}
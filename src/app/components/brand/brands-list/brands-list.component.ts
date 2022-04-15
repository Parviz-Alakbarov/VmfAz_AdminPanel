import { Component, OnInit } from '@angular/core';
import { BrandService } from './../../../app-services/brand.service';
import { BrandWithImageDto } from './../../../models/dtos/brandDtos/brandWithImageDto';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {

  brands:BrandWithImageDto[]=[];

  constructor(
    private brandService:BrandService,
    private spinner:NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.spinner.show();
    this.brandService.getBrandWithImage().subscribe(response=>{
      this.brands = response.data;
      this.spinner.hide();
    })
  }
}

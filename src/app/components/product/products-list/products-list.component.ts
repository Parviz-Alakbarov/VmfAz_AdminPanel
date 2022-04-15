import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../app-services/product.service';
import { ProductGetDto } from './../../../models/dtos/productDtos/productGetDto';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products:ProductGetDto[];

  constructor(
    private productService:ProductService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.spinner.show();
    this.productService.getProdcutsInGetDto().subscribe(response=>{
      this.products = response.data;
      this.spinner.hide();
    },errorResponse=>{
      console.log(errorResponse);
    })
  }

  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName;
  }

}

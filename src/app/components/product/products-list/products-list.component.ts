import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../app-services/product.service';
import { ProductGetDto } from './../../../models/dtos/productDtos/productGetDto';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ProductGetDtoAdmin } from 'src/app/models/dtos/productDtos/productGetDtoAdmin';
import { Pagination } from 'src/app/models/entities/pagination';
import { AdminParams } from './../../../models/entities/adminParams';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products:ProductGetDtoAdmin[] = [];
  pagination:Pagination;
  adminParams:AdminParams = new AdminParams();
  dataLoaded:boolean = false;

  constructor(
    private productService:ProductService,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    this.getPaginatedProduct();
  }

  // getProducts(){
  //   this.spinner.show();
  //   this.productService.getPaginatedProducts().subscribe(response=>{
  //     this.products = response.data;
  //     this.spinner.hide();
  //   },errorResponse=>{
  //     console.log(errorResponse);
  //   })
  // }

  getPaginatedProduct(){
    this.spinner.show();
    this.productService.getPaginatedProducts(this.adminParams).subscribe(response=>{
      this.products = response.body.data; 
      if (response.headers.get('Pagination') !== null) {
        this.pagination = JSON.parse(response.headers.get('Pagination'))  
      }
      console.log(this.pagination)
      this.dataLoaded = true;
      this.spinner.hide();
    },errorResponse=>{
      console.log(errorResponse);
    })
  }

  pageChanged(pageNumber:number){
    this.adminParams.pageNumber=pageNumber;
    window.scroll(0,0);
    this.getPaginatedProduct();
  }

  counter(i:number){
    return new Array(i);
  }


  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName;
  }

  deleteProduct(product:ProductGetDto){
    Swal.fire({
      title: `Are you sure to delete ${product.name}!`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.productService.deleteProduct(product.id).subscribe(
          response=>{
            this.spinner.hide();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then(()=>{
              this.getPaginatedProduct();
            })
          },
          error=>{
            console.log(error);
          },
          ()=>{
            this.spinner.hide();
          }
        )
      }
    })
  }

}

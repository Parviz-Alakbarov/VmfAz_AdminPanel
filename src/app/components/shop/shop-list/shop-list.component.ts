import { Component, OnInit } from '@angular/core';
import { ShopService } from './../../../app-services/shop.service';
import { Shop } from './../../../models/entities/shop';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  shops:Shop[];

  constructor(
    private shopService:ShopService,
    private toastrService:ToastrService,
    private spinner : NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.getShops();
  }

  getShops(){
    this.spinner.show();
    this.shopService.getShops().subscribe(response=>{
      this.shops = response.data;
      this.spinner.hide();
      //spinner
    },errorResponse=>{
      console.log(errorResponse);
      
    })
  }

  addShop(shop:Shop){
    this.shopService.addShop(shop).subscribe(response=>{
      this.toastrService.success(response.message,"Success")
    },errorResponse=>{
      this.toastrService.error(errorResponse.message,"Error");
    })
  }

  deleteShop(shopId:number){
    this.shopService.deleteShop(shopId).subscribe(response=>{
      
    })
  }
}

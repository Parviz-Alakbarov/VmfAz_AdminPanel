import { Component, OnInit } from '@angular/core';
import { ShopService } from './../../../app-services/shop.service';
import { Shop } from './../../../models/entities/shop';
import { ToastrService } from 'ngx-toastr';

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

  ) { }

  ngOnInit(): void {
    this.getShops();
  }

  getShops(){
    this.shopService.getShops().subscribe(response=>{
      this.shops = response.data;
      //spinner
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

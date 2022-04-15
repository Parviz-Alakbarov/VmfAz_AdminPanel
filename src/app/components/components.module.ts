import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductsListComponent } from './product/products-list/products-list.component';

import { TextInputComponent } from './forms/text-input/text-input.component';
import { SelectInputComponent } from './forms/select-input/select-input.component';
import { TextareaInputComponent } from './forms/textarea-input/textarea-input.component';



import { BrandsListComponent } from './brand/brands-list/brands-list.component';
import { BrandAddComponent } from './brand/brand-add/brand-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { ShopAddComponent } from './shop/shop-add/shop-add.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { SlidersListComponent } from './slider/sliders-list/sliders-list.component';
import { SliderAddComponent } from './slider/slider-add/slider-add.component';
@NgModule({
  imports: [
  CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProductAddComponent,
    ProductsListComponent,

    TextInputComponent,
    SelectInputComponent,
    TextareaInputComponent,
    
    BrandsListComponent,
    BrandAddComponent,
    ShopListComponent,
    ShopAddComponent,
    SlidersListComponent,
    SliderAddComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }

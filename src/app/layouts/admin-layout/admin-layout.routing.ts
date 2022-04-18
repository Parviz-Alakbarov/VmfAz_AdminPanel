import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ProductsListComponent } from 'src/app/components/product/products-list/products-list.component';
import { ProductAddComponent } from 'src/app/components/product/product-add/product-add.component';
import { BrandsListComponent } from 'src/app/components/brand/brands-list/brands-list.component';
import { BrandAddComponent } from 'src/app/components/brand/brand-add/brand-add.component';
import { ShopListComponent } from 'src/app/components/shop/shop-list/shop-list.component';
import { ShopAddComponent } from 'src/app/components/shop/shop-add/shop-add.component';
import { SlidersListComponent } from 'src/app/components/slider/sliders-list/sliders-list.component';
import { SliderAddComponent } from 'src/app/components/slider/slider-add/slider-add.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { ProductEditComponent } from 'src/app/components/product/product-edit/product-edit.component';
import { ShopEditComponent } from 'src/app/components/shop/shop-edit/shop-edit.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,      canActivate: [LoginGuard] },
    { path: 'user-profile',   component: UserProfileComponent,    canActivate: [LoginGuard] },
    { path: 'tables',         component: TablesComponent,         canActivate: [LoginGuard] },
    { path: 'icons',          component: IconsComponent,          canActivate: [LoginGuard] },
    { path: 'products',       component: ProductsListComponent,   canActivate: [LoginGuard] },
    { path: 'products/add',   component: ProductAddComponent,     canActivate: [LoginGuard] },
    { path: 'brands',         component: BrandsListComponent,     canActivate: [LoginGuard] },
    { path: 'brands/add',     component: BrandAddComponent,       canActivate: [LoginGuard] },
    { path: 'shops',          component: ShopListComponent,       canActivate: [LoginGuard] },
    { path: 'shops/add',      component: ShopAddComponent,        canActivate: [LoginGuard] },
    { path: 'sliders',        component: SlidersListComponent,    canActivate: [LoginGuard] },
    { path: 'sliders/add',    component: SliderAddComponent,      canActivate: [LoginGuard] },
    
    { path: 'products/edit/:productId' , component: ProductEditComponent,       canActivate: [LoginGuard] },
    { path: 'shops/edit/:shopId' ,       component: ShopEditComponent,          canActivate: [LoginGuard] },
];

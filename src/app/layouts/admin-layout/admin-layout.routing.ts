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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'products',       component: ProductsListComponent },
    { path: 'products/add',   component: ProductAddComponent},
    { path: 'brands',       component: BrandsListComponent },
    { path: 'brands/add',   component: BrandAddComponent},
    { path: 'shops',       component: ShopListComponent },
    { path: 'shops/add',   component: ShopAddComponent},
    { path: 'sliders',       component: SlidersListComponent },
    { path: 'sliders/add',   component: SliderAddComponent},
];

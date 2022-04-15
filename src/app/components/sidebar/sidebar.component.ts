import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/app-services/auth.service';
import { LocalStorageService } from 'src/app/app-services/local-storage.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/products', title: 'Products',  icon: 'ni-box-2 text-success', class: '' },
    { path: '/brands', title: 'Brands',  icon: 'ni-bold text-yellow', class: '' },
    { path: '/shops', title: 'Shops',  icon: 'ni-shop text-orange', class: '' },
    { path: '/sliders', title: 'Sliders',  icon: 'ni-album-2 text-info', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }


  logout(){
    this.authService.logout().subscribe(response=>{
     this.localStorageService.remove('token')
     this.localStorageService.remove('refreshToken')
      this.toastrService.success("Hesabdan çıxış olundu.","Success")
      this.router.navigateByUrl("/")
    },errorResponse=>{
      console.log(errorResponse);
      this.toastrService.error("Hesabdan çıxış olunarkən xəta baş verdi","Error");
    })
  }
}

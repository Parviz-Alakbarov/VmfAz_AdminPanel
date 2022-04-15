import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-services/auth.service';
import { LocalStorageService } from 'src/app/app-services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(
    location: Location,  
    private element: ElementRef, 
    private router: Router, 
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
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

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, throwError, switchMap } from 'rxjs';
import { LocalStorageService } from '../app-services/local-storage.service';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { TokenRespoinseModel } from '../models/auth/tokenResponseModel';
import { AuthService } from '../app-services/auth.service';
import { RefreshTokenModel } from './../models/auth/refreshTokenModel';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken = "";
  refresh:boolean = false;

  constructor(
    private localStorageService:LocalStorageService,
    private authService:AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.localStorageService.getItem('token');
    let newRequest : HttpRequest<any> ;
    newRequest = request.clone({
      headers:request.headers.set("Authorization","Bearer "+token)
    });
    // console.log("1-------asdfasdf");
    
    
    return next.handle(newRequest).pipe(catchError(( err:HttpErrorResponse )=>{

      if (err.status ===401 && !this.refresh) {

        this.refresh = true;
        let tempRefreshToken= this.localStorageService.getItem('refreshToken');
        
        let refreshToken : RefreshTokenModel={ refreshToken :tempRefreshToken};
        // refreshToken.refreshToken = this.localStorageService.getItem('refreshToken');

        this.authService.refresh(refreshToken).subscribe(response=>{

          this.localStorageService.add("token",response.data.accessToken.token);
          this.localStorageService.add("refreshToken",response.data.refreshToken.token);
          // token = this.localStorageService.getItem('token');

          let secNewRequest : HttpRequest<any> ;
          newRequest = request.clone({
            headers:request.headers.set("Authorization","Bearer "+response.data.accessToken)
          });
          // newRequest = request.clone({
          //   headers:request.headers.set("Authorization","Bearer "+token)
          // });

          return next.handle(secNewRequest);

          error=>{
            console.log(error);
          }
        })
      }
      this.refresh = false;
      return throwError(()=>err);
    }));
  }
}

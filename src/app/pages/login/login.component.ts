import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/app-services/auth.service';
import { LocalStorageService } from 'src/app/app-services/local-storage.service';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { ValidationErrorResponseModel } from 'src/app/models/responses/validationErrorResponseModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm:FormGroup;
  
  validationErrors:ValidationErrorResponseModel[] = []; 
  
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private storageService:LocalStorageService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.createLoginForm();
  }
  ngOnDestroy() {

  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", [Validators.required,Validators.email]],
      password:["", 
        [  
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(25), 
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$')
        ]
      ]
    })
    this.spinner.hide();
  }



  login(){
    if (this.loginForm.valid) {
      this.spinner.show();
      let loginModel  =  Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Hesabiniza daxil olundu!","Success");
        this.storageService.add('token',response.data.accessToken.token);
        this.storageService.add('refreshToken',response.data.refreshToken.token);
        AuthInterceptor.accessToken = response.data.accessToken.token;
        this.router.navigateByUrl('/')
      },responseError=>{
        this.spinner.hide();
        if (responseError.status == 401) {
          const temp: ValidationErrorResponseModel = {
           ErrorMessage :responseError.error,
           AttemptedValue:'',
           PropertyName:''
          };  
          this.validationErrors.push(temp)
        }
        if (responseError.error.ValidationErrors) {
          this.validationErrors = responseError.error.ValidationErrors; 
        }
      },() => {
        this.spinner.hide();
      }
      );
    }
    else{
      this.toastrService.error("Form Düzgün deyil!","Error")
    }
  }


}

import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginInfo } from '../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[UserService]
})
export class LoginComponent implements OnInit{

  onClickURL(url: string) {
    if(url.indexOf("doctor")>0){
      url = url+"="+(Math.random() * 100) + 1;
    }
    this.router.navigateByUrl(url);
  }

  @Input()
  login!: FormGroup;

  
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private loginInfo: LoginInfo){

  }
  ngOnInit(): void {
   this.login = this.formBuilder.group({
    username : ['',Validators.required],
    password: ['', Validators.required] 
   });
  }

  onSubmit() {
    if(this.login.valid){
      let user = this.login.value;
      this.userService.login(user).subscribe(tokenInfo => {
        if(tokenInfo && tokenInfo.accessToken){
          sessionStorage.setItem("tkn",tokenInfo.accessToken);
          sessionStorage.setItem("rtkn",tokenInfo.token);
          this.loginInfo.accessToken = tokenInfo.accessToken;
          this.loginInfo.refreshToken = tokenInfo.token;
          // this.router.navigateByUrl("/home");
          window.location.reload();
        }
      });
    }else{
      alert("Please enter username and password");
    }
  }

}

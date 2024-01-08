import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes } from '@angular/router';


@Injectable()
export class LoginInfo{
    accessToken?: string | null;
    refreshToken?: string | null ;
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
          // Code that uses sessionStorage
          if(sessionStorage.getItem('tkn')){
            this.accessToken = sessionStorage.getItem('tkn')
        }
        if(sessionStorage.getItem('rtkn')){
            this.refreshToken = sessionStorage.getItem('rtkn')
        }
        }
      }
  

} 

@Injectable()
export class AuthorizationService {

    constructor(){}

  canActivate(currentUser: LoginInfo): boolean {
    
    if(currentUser && currentUser.accessToken){
        return true;
    }
    return false;
  }

  unknownUserCanActivate(currentUser: LoginInfo): boolean {
    if(currentUser && currentUser.accessToken){
        return false;
    }
    return true;
  }
}

export const canActivateFn: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let canActivate: boolean = inject(AuthorizationService).canActivate(inject(LoginInfo));
    if(canActivate){
        return true; 
    }
    
    return inject(Router).createUrlTree(['/login']);
};
export const unknownUserCanActivateFn: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let canActivate: boolean = inject(AuthorizationService).unknownUserCanActivate(inject(LoginInfo));
    if(canActivate){
        return true; 
    }
    return inject(Router).createUrlTree(['/home']);
};

export const routes: Routes = [
    {
        path:'',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path:'login',
        loadChildren: () => import("./login/login.module").then(m => m.LoginModule),
        canActivate: [unknownUserCanActivateFn]
        // component:LoginComponent,
    },{
        path:'register',
        loadChildren: () => import("./register/register.module").then(m => m.RegisterModule),
        canActivate: [unknownUserCanActivateFn]
        // component:RegisterComponent,
    },{
        path:'home',
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
        canActivate: [canActivateFn]
        // component:RegisterComponent,
    },
    {
        path: 'forget-password',
        loadChildren: () => import("./forget-password/forget-password.module").then(m => m.ForgetPasswordModule),
         canActivate: [unknownUserCanActivateFn]
    }
];

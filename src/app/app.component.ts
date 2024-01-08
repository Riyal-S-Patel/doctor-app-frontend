import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthorizationService, LoginInfo } from './app.routes';
import { httpInterceptorProviders } from './service/interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [LoginInfo, AuthorizationService,httpInterceptorProviders],
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent {
  title = 'doctor-appointment-app';
}

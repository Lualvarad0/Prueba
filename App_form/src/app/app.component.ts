import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private AuthService: AuthService) { }
  isLoggedIn(): boolean {
    return this.AuthService.isLoggedIn();
throw new Error('Method not implemented.');
}
  title = 'App_form';



}

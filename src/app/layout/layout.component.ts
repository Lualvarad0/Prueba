import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  sidebarOpen = false;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}

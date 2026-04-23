import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nvar',
  templateUrl: './nvar.component.html',
  styleUrls: ['./nvar.component.css']
})
export class NvarComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}

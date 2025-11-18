import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  // CORRECCIÓN: Apuntamos a los nombres largos que tienes en tu carpeta
  templateUrl: './dashboard.home.component.html',
  styleUrls: ['./dashboard.home.component.scss']
})
export class DashboardHomeComponent {

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-navbar.component.html',
  styles: ``,
})
export class LayoutNavbarComponent {
  private authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}

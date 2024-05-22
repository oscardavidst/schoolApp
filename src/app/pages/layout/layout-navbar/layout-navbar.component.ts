import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-navbar.component.html',
  styles: ``,
})
export class LayoutNavbarComponent implements OnInit {
  private authService = inject(AuthService);
  public userEmail: string | undefined = localStorage

    .getItem('email')
    ?.toString();

  public userRoles: string | undefined = localStorage
    .getItem('roles')
    ?.toString();

  ngOnInit(): void {}
  onLogout() {
    this.authService.logout();
  }
}

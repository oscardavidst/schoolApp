import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutNavbarComponent } from '../layout-navbar/layout-navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, LayoutNavbarComponent],
  templateUrl: './layout.component.html',
  styles: ``,
})
export class LayoutComponent {}

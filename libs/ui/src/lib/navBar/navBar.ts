import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { env } from '@penny/shared-validation';
import { AuthService } from '@penny/services';
import { Router, RouterModule } from '@angular/router';

@Inject(AuthService)
@Component({
  selector: 'lib-nav-bar',
  imports: [CommonModule, MenubarModule, ButtonModule, RouterModule],
  templateUrl: './navBar.html',
  styleUrl: './navBar.scss',
  // standalone: true,
})
export class NavBar {
  items: MenuItem[] = [];
  appName = env.appName;
  constructor(public auth: AuthService, private router: Router) {}
  onLogout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

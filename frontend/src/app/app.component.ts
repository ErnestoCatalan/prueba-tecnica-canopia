import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule,
    MenubarModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items = [
    {
      label: 'Productos',
      icon: 'pi pi-fw pi-box',
      routerLink: '/products'
    },
    {
      label: 'Categorías',
      icon: 'pi pi-fw pi-tags',
      routerLink: '/categories'
    }
  ];

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']); // Redirigir explícitamente al login
  }

  showNavbar(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/login' &&
           currentRoute !== '/register' &&
           this.auth.isAuthenticated();
  }
}

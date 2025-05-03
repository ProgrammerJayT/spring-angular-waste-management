import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a [routerLink]="['/']" class="brand-link">
          <span class="brand-icon">♻️</span>
          <span class="brand-name">Waste Management</span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a [routerLink]="['/profile']" class="navbar-item">
            <span class="user-icon">👤</span>
            <span class="user-name">User</span>
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #2E7D32;
      color: white;
      padding: 0.75rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .navbar-brand {
      display: flex;
      align-items: center;
    }
    
    .brand-link {
      display: flex;
      align-items: center;
      color: white;
      text-decoration: none;
      font-weight: bold;
      font-size: 1.25rem;
    }
    
    .brand-icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    
    .navbar-menu {
      display: flex;
    }
    
    .navbar-end {
      display: flex;
      align-items: center;
    }
    
    .navbar-item {
      color: white;
      text-decoration: none;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      transition: background-color 0.3s;
      border-radius: 4px;
    }
    
    .navbar-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .user-icon {
      margin-right: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .brand-name, .user-name {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {}
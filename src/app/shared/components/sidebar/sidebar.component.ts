import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <ul class="sidebar-menu">
        <li class="sidebar-item">
          <a [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar-link">
            <span class="sidebar-icon">📊</span>
            <span class="sidebar-text">Dashboard</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a [routerLink]="['/waste-tracking']" routerLinkActive="active" class="sidebar-link">
            <span class="sidebar-icon">🗑️</span>
            <span class="sidebar-text">Waste Tracking</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a [routerLink]="['/bin-locations']" routerLinkActive="active" class="sidebar-link">
            <span class="sidebar-icon">📍</span>
            <span class="sidebar-text">Recycling Bins</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a [routerLink]="['/pickups']" routerLinkActive="active" class="sidebar-link">
            <span class="sidebar-icon">🚚</span>
            <span class="sidebar-text">Pickup Scheduling</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a [routerLink]="['/analytics']" routerLinkActive="active" class="sidebar-link">
            <span class="sidebar-icon">📈</span>
            <span class="sidebar-text">Analytics</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a [routerLink]="['/admin']" routerLinkActive="active" class="sidebar-link">
            <span class="sidebar-icon">⚙️</span>
            <span class="sidebar-text">Admin</span>
          </a>
        </li>
      </ul>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      background: #fff;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
      height: 100%;
      transition: width 0.3s;
    }
    
    .sidebar-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .sidebar-item {
      margin: 0;
      padding: 0;
    }
    
    .sidebar-link {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      color: #333;
      text-decoration: none;
      transition: all 0.3s;
    }
    
    .sidebar-link:hover {
      background-color: #f5f5f5;
    }
    
    .sidebar-link.active {
      background-color: #e8f5e9;
      color: #2E7D32;
      border-left: 4px solid #2E7D32;
    }
    
    .sidebar-icon {
      margin-right: 0.75rem;
      font-size: 1.25rem;
    }
    
    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        height: auto;
      }
      
      .sidebar-menu {
        display: flex;
        overflow-x: auto;
      }
      
      .sidebar-link {
        flex-direction: column;
        padding: 0.75rem;
      }
      
      .sidebar-icon {
        margin-right: 0;
        margin-bottom: 0.25rem;
      }
      
      .sidebar-text {
        font-size: 0.75rem;
      }
    }
  `]
})
export class SidebarComponent {}
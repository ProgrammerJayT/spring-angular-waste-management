import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <div class="content-wrapper">
        <app-sidebar></app-sidebar>
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .content-wrapper {
      display: flex;
      flex: 1;
    }
    
    .main-content {
      flex: 1;
      padding: 1.5rem;
      background-color: #f5f5f5;
      overflow-y: auto;
    }
    
    @media (max-width: 768px) {
      .content-wrapper {
        flex-direction: column;
      }
    }
  `]
})
export class AppComponent {
  title = 'Waste Management System';
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p class="footer-text">© 2025 Waste Management System | Sustainability Initiative</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #f5f5f5;
      padding: 1rem;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    
    .footer-text {
      margin: 0;
      color: #666;
      font-size: 0.875rem;
    }
  `]
})
export class FooterComponent {}
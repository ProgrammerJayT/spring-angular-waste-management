import { Component, OnInit } from '@angular/core';
import { RecyclingBin } from '../../core/models/recycling-bin.model';
import { WasteRecord } from '../../core/models/waste-record.model';
import { PickupSchedule } from '../../core/models/pickup-schedule.model';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <h1 class="dashboard-title">Dashboard</h1>
        <p class="dashboard-subtitle">Welcome to the Waste Management System</p>
      </header>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-icon">♻️</div>
          <div class="stat-content">
            <h3 class="stat-title">Total Recycled</h3>
            <p class="stat-value">{{ totalRecycled }} kg</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🗑️</div>
          <div class="stat-content">
            <h3 class="stat-title">Waste Records</h3>
            <p class="stat-value">{{ recentRecords.length }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📍</div>
          <div class="stat-content">
            <h3 class="stat-title">Recycling Bins</h3>
            <p class="stat-value">{{ bins.length }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🚚</div>
          <div class="stat-content">
            <h3 class="stat-title">Pending Pickups</h3>
            <p class="stat-value">{{ pendingPickups.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-recent">
        <div class="recent-section">
          <div class="section-header">
            <h2 class="section-title">Recent Waste Records</h2>
            <a [routerLink]="['/waste-tracking']" class="section-link">View All</a>
          </div>
          
          <div class="card-list">
            <div class="empty-message" *ngIf="recentRecords.length === 0">
              No recent waste records found.
            </div>
            
            <div class="record-card" *ngFor="let record of recentRecords">
              <div class="record-type">{{ record.wasteType?.name || 'Unknown' }}</div>
              <div class="record-details">
                <p class="record-weight">{{ record.weightKg }} kg</p>
                <p class="record-method">{{ record.disposalMethod }}</p>
              </div>
              <div class="record-date">{{ record.disposedAt | date:'short' }}</div>
            </div>
          </div>
        </div>
        
        <div class="recent-section">
          <div class="section-header">
            <h2 class="section-title">Upcoming Pickups</h2>
            <a [routerLink]="['/pickups']" class="section-link">View All</a>
          </div>
          
          <div class="card-list">
            <div class="empty-message" *ngIf="pendingPickups.length === 0">
              No upcoming pickups scheduled.
            </div>
            
            <div class="pickup-card" *ngFor="let pickup of pendingPickups">
              <div class="pickup-status" [class.scheduled]="pickup.status === 'SCHEDULED'"
                                        [class.in-progress]="pickup.status === 'IN_PROGRESS'">
                {{ pickup.status }}
              </div>
              <div class="pickup-details">
                <p class="pickup-address">{{ pickup.address }}</p>
                <p class="pickup-types">{{ pickup.wasteTypes }}</p>
              </div>
              <div class="pickup-date">{{ pickup.pickupDate | date:'MMM d, y' }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="dashboard-actions">
        <a [routerLink]="['/waste-tracking']" class="action-card">
          <span class="action-icon">🗑️</span>
          <span class="action-text">Log Waste</span>
        </a>
        
        <a [routerLink]="['/bin-locations']" class="action-card">
          <span class="action-icon">📍</span>
          <span class="action-text">Find Bins</span>
        </a>
        
        <a [routerLink]="['/pickups']" class="action-card">
          <span class="action-icon">🚚</span>
          <span class="action-text">Schedule Pickup</span>
        </a>
        
        <a [routerLink]="['/analytics']" class="action-card">
          <span class="action-icon">📊</span>
          <span class="action-text">View Analytics</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .dashboard-header {
      margin-bottom: 1rem;
    }
    
    .dashboard-title {
      font-size: 1.75rem;
      color: #2E7D32;
      margin: 0;
    }
    
    .dashboard-subtitle {
      color: #666;
      margin: 0.5rem 0 0;
    }
    
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }
    
    .stat-card {
      background: white;
      border-radius: 8px;
      padding: 1.25rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .stat-icon {
      font-size: 2rem;
      margin-right: 1rem;
    }
    
    .stat-title {
      color: #666;
      font-size: 0.875rem;
      margin: 0 0 0.25rem;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2E7D32;
      margin: 0;
    }
    
    .dashboard-recent {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .recent-section {
      background: white;
      border-radius: 8px;
      padding: 1.25rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .section-title {
      font-size: 1.25rem;
      margin: 0;
      color: #333;
    }
    
    .section-link {
      color: #1976D2;
      text-decoration: none;
      font-size: 0.875rem;
    }
    
    .section-link:hover {
      text-decoration: underline;
    }
    
    .card-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .record-card, .pickup-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      border-radius: 4px;
      background: #f9f9f9;
      transition: background-color 0.2s;
    }
    
    .record-card:hover, .pickup-card:hover {
      background: #f0f0f0;
    }
    
    .record-type, .pickup-status {
      font-weight: bold;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }
    
    .record-type {
      background: #e8f5e9;
      color: #2E7D32;
    }
    
    .pickup-status {
      text-transform: capitalize;
    }
    
    .pickup-status.scheduled {
      background: #e3f2fd;
      color: #1976D2;
    }
    
    .pickup-status.in-progress {
      background: #fff8e1;
      color: #FF8F00;
    }
    
    .record-details, .pickup-details {
      flex: 1;
      padding: 0 1rem;
    }
    
    .record-weight, .pickup-address {
      font-weight: bold;
      margin: 0;
    }
    
    .record-method, .pickup-types {
      color: #666;
      font-size: 0.875rem;
      margin: 0.25rem 0 0;
    }
    
    .record-date, .pickup-date {
      color: #666;
      font-size: 0.75rem;
    }
    
    .empty-message {
      padding: 1rem;
      text-align: center;
      color: #999;
      font-style: italic;
    }
    
    .dashboard-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
    }
    
    .action-card {
      background: white;
      border-radius: 8px;
      padding: 1.25rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      color: #333;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .action-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      color: #2E7D32;
    }
    
    .action-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .action-text {
      font-weight: bold;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalRecycled: number = 0;
  recentRecords: WasteRecord[] = [];
  bins: RecyclingBin[] = [];
  pendingPickups: PickupSchedule[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // In a real implementation, these would be API calls
    // For demo purposes, we're initializing with mock data
    this.totalRecycled = 1350.5;
    
    this.recentRecords = [
      {
        id: 1,
        user: { id: 2, username: 'user1' },
        wasteType: { id: 1, name: 'Plastic' },
        weightKg: 5.2,
        disposalMethod: 'RECYCLED' as any,
        disposedAt: new Date().toISOString(),
        notes: 'Plastic bottles and containers'
      },
      {
        id: 2,
        user: { id: 2, username: 'user1' },
        wasteType: { id: 2, name: 'Paper' },
        weightKg: 3.7,
        disposalMethod: 'RECYCLED' as any,
        disposedAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
        notes: 'Newspapers and cardboard'
      }
    ];
    
    this.bins = [
      {
        id: 1,
        name: 'Central Park Recycling Center',
        address: '123 Park Avenue',
        latitude: 40.785091,
        longitude: -73.968285,
        wasteTypes: 'Plastic,Paper,Glass',
        capacityKg: 500,
        currentFillPercentage: 35
      },
      {
        id: 2,
        name: 'Downtown Recycling Hub',
        address: '456 Main Street',
        latitude: 40.712742,
        longitude: -74.013382,
        wasteTypes: 'Plastic,Paper,Glass,Organic',
        capacityKg: 1000,
        currentFillPercentage: 65
      }
    ];
    
    this.pendingPickups = [
      {
        id: 1,
        user: { id: 2, username: 'user1' },
        address: '123 Residential St, Apt 4B',
        pickupDate: new Date(Date.now() + 2 * 86400000).toISOString(), // 2 days from now
        wasteTypes: 'Plastic,Paper',
        status: 'SCHEDULED' as any,
        requestedAt: new Date().toISOString(),
        completedAt: '',
        notes: 'Please pickup before noon'
      }
    ];
  }
}
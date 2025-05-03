import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { RecyclingBin } from '../../core/models/recycling-bin.model';
import { WasteType } from '../../core/models/waste-type.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin">
      <header class="page-header">
        <h1 class="page-title">Admin Dashboard</h1>
        <p class="page-subtitle">Manage users, bins, and waste types</p>
      </header>
      
      <div class="admin-tabs">
        <button class="tab-button" [class.active]="activeTab === 'users'" (click)="activeTab = 'users'">
          Users
        </button>
        <button class="tab-button" [class.active]="activeTab === 'bins'" (click)="activeTab = 'bins'">
          Recycling Bins
        </button>
        <button class="tab-button" [class.active]="activeTab === 'waste-types'" (click)="activeTab = 'waste-types'">
          Waste Types
        </button>
        <button class="tab-button" [class.active]="activeTab === 'system'" (click)="activeTab = 'system'">
          System Settings
        </button>
      </div>
      
      <div class="admin-content">
        <!-- Users Management -->
        <div *ngIf="activeTab === 'users'" class="tab-content">
          <div class="section-header">
            <h2 class="section-title">User Management</h2>
            <button class="btn-primary">Add New User</button>
          </div>
          
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users">
                  <td>{{ user.id }}</td>
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span class="badge" [class.admin]="user.role === 'ADMIN'" [class.user]="user.role === 'USER'">
                      {{ user.role }}
                    </span>
                  </td>
                  <td>{{ user.createdAt | date:'medium' }}</td>
                  <td>
                    <div class="actions">
                      <button class="btn-action edit">Edit</button>
                      <button class="btn-action delete">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Recycling Bins Management -->
        <div *ngIf="activeTab === 'bins'" class="tab-content">
          <div class="section-header">
            <h2 class="section-title">Recycling Bin Management</h2>
            <button class="btn-primary">Add New Bin</button>
          </div>
          
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Waste Types</th>
                  <th>Capacity</th>
                  <th>Fill Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let bin of recyclingBins">
                  <td>{{ bin.id }}</td>
                  <td>{{ bin.name }}</td>
                  <td>{{ bin.address }}</td>
                  <td>
                    <div class="tag-container">
                      <span class="tag" *ngFor="let type of bin.wasteTypes.split(',')">{{ type }}</span>
                    </div>
                  </td>
                  <td>{{ bin.capacityKg }} kg</td>
                  <td>
                    <div class="progress-bar">
                      <div class="progress-fill" [style.width.%]="bin.currentFillPercentage"
                           [ngClass]="{'low': bin.currentFillPercentage < 40, 
                                       'medium': bin.currentFillPercentage >= 40 && bin.currentFillPercentage < 70,
                                       'high': bin.currentFillPercentage >= 70}">
                      </div>
                    </div>
                    <span class="progress-text">{{ bin.currentFillPercentage }}%</span>
                  </td>
                  <td>
                    <div class="actions">
                      <button class="btn-action edit">Edit</button>
                      <button class="btn-action delete">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Waste Types Management -->
        <div *ngIf="activeTab === 'waste-types'" class="tab-content">
          <div class="section-header">
            <h2 class="section-title">Waste Type Management</h2>
            <button class="btn-primary">Add New Type</button>
          </div>
          
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Recyclable</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let type of wasteTypes">
                  <td>{{ type.id }}</td>
                  <td>{{ type.name }}</td>
                  <td>{{ type.description }}</td>
                  <td>
                    <span class="badge" [class.yes]="type.recyclable" [class.no]="!type.recyclable">
                      {{ type.recyclable ? 'Yes' : 'No' }}
                    </span>
                  </td>
                  <td>
                    <div class="actions">
                      <button class="btn-action edit">Edit</button>
                      <button class="btn-action delete">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- System Settings -->
        <div *ngIf="activeTab === 'system'" class="tab-content">
          <div class="section-header">
            <h2 class="section-title">System Settings</h2>
          </div>
          
          <div class="settings-grid">
            <div class="settings-card">
              <h3 class="settings-card-title">Database</h3>
              <div class="settings-status connected">Connected</div>
              <div class="settings-details">
                <div>Type: H2 In-Memory</div>
                <div>Size: 24.5 MB</div>
                <div>Last backup: 2025-01-15 09:30 AM</div>
              </div>
              <div class="settings-actions">
                <button class="btn-secondary">Backup</button>
                <button class="btn-secondary">Optimize</button>
              </div>
            </div>
            
            <div class="settings-card">
              <h3 class="settings-card-title">Email Notifications</h3>
              <div class="settings-status enabled">Enabled</div>
              <div class="settings-details">
                <div>Provider: SMTP</div>
                <div>Daily limit: 1000</div>
                <div>Used today: 124</div>
              </div>
              <div class="settings-actions">
                <button class="btn-secondary">Configure</button>
                <button class="btn-secondary">Test</button>
              </div>
            </div>
            
            <div class="settings-card">
              <h3 class="settings-card-title">API Access</h3>
              <div class="settings-status enabled">Enabled</div>
              <div class="settings-details">
                <div>Active keys: 3</div>
                <div>Rate limit: 100/min</div>
                <div>Last request: 2025-01-15 10:15 AM</div>
              </div>
              <div class="settings-actions">
                <button class="btn-secondary">Manage Keys</button>
                <button class="btn-secondary">Logs</button>
              </div>
            </div>
            
            <div class="settings-card">
              <h3 class="settings-card-title">System Maintenance</h3>
              <div class="settings-details">
                <div>Version: 1.0.0</div>
                <div>Last update: 2025-01-10</div>
                <div>Uptime: 5 days, 6 hours</div>
              </div>
              <div class="settings-actions">
                <button class="btn-danger">Maintenance Mode</button>
                <button class="btn-secondary">Check Updates</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .page-header {
      margin-bottom: 1rem;
    }
    
    .page-title {
      font-size: 1.75rem;
      color: #2E7D32;
      margin: 0;
    }
    
    .page-subtitle {
      color: #666;
      margin: 0.5rem 0 0;
    }
    
    .admin-tabs {
      display: flex;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .tab-button {
      padding: 1rem 1.5rem;
      flex: 1;
      border: none;
      background: none;
      font-size: 0.875rem;
      font-weight: 500;
      color: #666;
      cursor: pointer;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;
    }
    
    .tab-button.active {
      color: #2E7D32;
      border-bottom-color: #2E7D32;
      background-color: #f9f9f9;
    }
    
    .tab-button:hover:not(.active) {
      background-color: #f5f5f5;
    }
    
    .admin-content {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    
    .section-title {
      font-size: 1.25rem;
      color: #333;
      margin: 0;
    }
    
    .btn-primary {
      background-color: #2E7D32;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .btn-primary:hover {
      background-color: #1b5e20;
    }
    
    .table-container {
      overflow-x: auto;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    
    .data-table th, .data-table td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .data-table th {
      font-weight: 500;
      color: #333;
      background-color: #f9f9f9;
    }
    
    .data-table tr:last-child td {
      border-bottom: none;
    }
    
    .data-table tr:hover td {
      background-color: #f5f5f5;
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .badge.admin {
      background-color: #e3f2fd;
      color: #1976D2;
    }
    
    .badge.user {
      background-color: #f5f5f5;
      color: #333;
    }
    
    .badge.yes {
      background-color: #e8f5e9;
      color: #2E7D32;
    }
    
    .badge.no {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-action {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .btn-action.edit {
      background-color: #e3f2fd;
      color: #1976D2;
    }
    
    .btn-action.edit:hover {
      background-color: #bbdefb;
    }
    
    .btn-action.delete {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    .btn-action.delete:hover {
      background-color: #ffcdd2;
    }
    
    .tag-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
    
    .tag {
      display: inline-block;
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      font-size: 0.75rem;
      background-color: #f5f5f5;
      color: #333;
    }
    
    .progress-bar {
      background-color: #f5f5f5;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.25rem;
    }
    
    .progress-fill {
      height: 100%;
      border-radius: 4px;
    }
    
    .progress-fill.low {
      background-color: #4caf50;
    }
    
    .progress-fill.medium {
      background-color: #ff9800;
    }
    
    .progress-fill.high {
      background-color: #f44336;
    }
    
    .progress-text {
      font-size: 0.75rem;
      color: #666;
    }
    
    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .settings-card {
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .settings-card-title {
      font-size: 1.125rem;
      color: #333;
      margin: 0;
    }
    
    .settings-status {
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      display: inline-block;
      align-self: flex-start;
    }
    
    .settings-status.connected, .settings-status.enabled {
      background-color: #e8f5e9;
      color: #2E7D32;
    }
    
    .settings-status.disconnected, .settings-status.disabled {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    .settings-details {
      font-size: 0.875rem;
      color: #666;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .settings-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    
    .btn-secondary {
      background-color: #f5f5f5;
      color: #333;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .btn-secondary:hover {
      background-color: #e0e0e0;
    }
    
    .btn-danger {
      background-color: #ffebee;
      color: #d32f2f;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .btn-danger:hover {
      background-color: #ffcdd2;
    }
  `]
})
export class AdminComponent {
  activeTab: 'users' | 'bins' | 'waste-types' | 'system' = 'users';
  
  users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@wastemanagement.com',
      role: 'ADMIN' as any,
      createdAt: new Date(2024, 0, 1).toISOString()
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
      role: 'USER' as any,
      createdAt: new Date(2024, 5, 15).toISOString()
    },
    {
      id: 3,
      username: 'user2',
      email: 'user2@example.com',
      role: 'USER' as any,
      createdAt: new Date(2024, 8, 22).toISOString()
    }
  ];
  
  recyclingBins: RecyclingBin[] = [
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
    },
    {
      id: 3,
      name: 'Electronic Waste Center',
      address: '789 Tech Boulevard',
      latitude: 40.730610,
      longitude: -73.935242,
      wasteTypes: 'Electronic',
      capacityKg: 750,
      currentFillPercentage: 42
    },
    {
      id: 4,
      name: 'Hazardous Waste Facility',
      address: '101 Industrial Road',
      latitude: 40.758896,
      longitude: -73.985130,
      wasteTypes: 'Hazardous',
      capacityKg: 2000,
      currentFillPercentage: 28
    },
    {
      id: 5,
      name: 'Community Garden Compost',
      address: '202 Green Street',
      latitude: 40.742054,
      longitude: -73.988449,
      wasteTypes: 'Organic',
      capacityKg: 300,
      currentFillPercentage: 77
    }
  ];
  
  wasteTypes: WasteType[] = [
    { id: 1, name: 'Plastic', description: 'Plastic waste materials', recyclable: true },
    { id: 2, name: 'Paper', description: 'Paper waste materials', recyclable: true },
    { id: 3, name: 'Glass', description: 'Glass waste materials', recyclable: true },
    { id: 4, name: 'Organic', description: 'Food and garden waste', recyclable: true },
    { id: 5, name: 'Electronic', description: 'Electronic waste materials', recyclable: true },
    { id: 6, name: 'Hazardous', description: 'Hazardous waste materials', recyclable: false },
    { id: 7, name: 'General', description: 'General non-recyclable waste', recyclable: false }
  ];
}
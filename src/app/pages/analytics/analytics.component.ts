import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WasteAnalytics } from '../../core/models/waste-analytics.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="analytics">
      <header class="page-header">
        <h1 class="page-title">Waste Analytics</h1>
        <p class="page-subtitle">Analyze waste management trends and recycling impact</p>
      </header>
      
      <div class="filter-container">
        <div class="date-range">
          <label for="dateRange">Date Range:</label>
          <select id="dateRange" [(ngModel)]="selectedDateRange" (change)="onDateRangeChange()" class="select-control">
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
            <option value="year">Last 12 Months</option>
          </select>
        </div>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">Total Waste</div>
          <div class="stat-value">{{ getTotalWaste() | number:'1.0-1' }} kg</div>
          <div class="stat-trend" [class.positive]="getWasteTrend() <= 0" [class.negative]="getWasteTrend() > 0">
            <span class="trend-icon">{{ getWasteTrend() <= 0 ? '↓' : '↑' }}</span>
            <span class="trend-value">{{ getWasteTrend() | number:'1.0-1' }}%</span>
            <span class="trend-text">{{ getWasteTrend() <= 0 ? 'decrease' : 'increase' }}</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">Recycled Waste</div>
          <div class="stat-value">{{ getTotalRecycledWaste() | number:'1.0-1' }} kg</div>
          <div class="stat-trend" [class.positive]="getRecycledTrend() > 0" [class.negative]="getRecycledTrend() <= 0">
            <span class="trend-icon">{{ getRecycledTrend() > 0 ? '↑' : '↓' }}</span>
            <span class="trend-value">{{ getRecycledTrend() | number:'1.0-1' }}%</span>
            <span class="trend-text">{{ getRecycledTrend() > 0 ? 'increase' : 'decrease' }}</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">Recycling Rate</div>
          <div class="stat-value">{{ getAverageRecyclingRate() | number:'1.0-1' }}%</div>
          <div class="stat-trend" [class.positive]="getRecyclingRateTrend() > 0" [class.negative]="getRecyclingRateTrend() <= 0">
            <span class="trend-icon">{{ getRecyclingRateTrend() > 0 ? '↑' : '↓' }}</span>
            <span class="trend-value">{{ getRecyclingRateTrend() | number:'1.0-1' }}%</span>
            <span class="trend-text">{{ getRecyclingRateTrend() > 0 ? 'increase' : 'decrease' }}</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">Active Users</div>
          <div class="stat-value">{{ getAverageUserCount() }}</div>
          <div class="stat-trend" [class.positive]="getUserCountTrend() > 0" [class.negative]="getUserCountTrend() <= 0">
            <span class="trend-icon">{{ getUserCountTrend() > 0 ? '↑' : '↓' }}</span>
            <span class="trend-value">{{ getUserCountTrend() | number:'1.0-1' }}%</span>
            <span class="trend-text">{{ getUserCountTrend() > 0 ? 'increase' : 'decrease' }}</span>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <div class="chart-header">
          <h2 class="chart-title">Waste Management Trends</h2>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color total"></span>
              <span class="legend-text">Total Waste</span>
            </div>
            <div class="legend-item">
              <span class="legend-color recycled"></span>
              <span class="legend-text">Recycled Waste</span>
            </div>
          </div>
        </div>
        
        <div class="chart-placeholder">
          <div class="chart-message">
            <p>Chart visualization would be displayed here.</p>
            <p class="chart-note">In a real implementation, this would be an interactive chart using Chart.js or a similar library.</p>
          </div>
        </div>
      </div>
      
      <div class="data-grid">
        <h2 class="data-title">Detailed Data</h2>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Waste (kg)</th>
                <th>Recycled Waste (kg)</th>
                <th>Recycling Rate</th>
                <th>Active Users</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of analytics">
                <td>{{ item.date | date:'mediumDate' }}</td>
                <td>{{ item.totalWasteKg | number:'1.0-1' }}</td>
                <td>{{ item.recycledWasteKg | number:'1.0-1' }}</td>
                <td>{{ item.recyclingRate | number:'1.0-1' }}%</td>
                <td>{{ item.userCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics {
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
    
    .filter-container {
      background: white;
      border-radius: 8px;
      padding: 1rem 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: flex-end;
    }
    
    .date-range {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .date-range label {
      font-weight: 500;
      color: #333;
    }
    
    .select-control {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      font-size: 0.875rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .stat-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
    }
    
    .stat-header {
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    
    .stat-value {
      font-size: 1.75rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.75rem;
    }
    
    .stat-trend {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }
    
    .stat-trend.positive {
      color: #2E7D32;
    }
    
    .stat-trend.negative {
      color: #d32f2f;
    }
    
    .trend-icon {
      font-size: 1rem;
    }
    
    .trend-value {
      font-weight: bold;
    }
    
    .chart-container {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .chart-title {
      font-size: 1.25rem;
      color: #333;
      margin: 0;
    }
    
    .chart-legend {
      display: flex;
      gap: 1rem;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
    
    .legend-color.total {
      background-color: #1976D2;
    }
    
    .legend-color.recycled {
      background-color: #2E7D32;
    }
    
    .legend-text {
      font-size: 0.875rem;
      color: #666;
    }
    
    .chart-placeholder {
      background-color: #f5f5f5;
      border-radius: 4px;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .chart-message {
      text-align: center;
      padding: 2rem;
    }
    
    .chart-note {
      font-size: 0.875rem;
      color: #666;
      font-style: italic;
    }
    
    .data-grid {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .data-title {
      font-size: 1.25rem;
      color: #333;
      margin: 0 0 1.25rem;
    }
    
    .table-container {
      overflow-x: auto;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
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
  `]
})
export class AnalyticsComponent implements OnInit {
  selectedDateRange: string = 'month';
  analytics: WasteAnalytics[] = [
    {
      id: 1,
      date: '2025-01-01',
      totalWasteKg: 850.5,
      recycledWasteKg: 550.2,
      recyclingRate: 64.7,
      userCount: 15
    },
    {
      id: 2,
      date: '2025-01-08',
      totalWasteKg: 975.3,
      recycledWasteKg: 640.8,
      recyclingRate: 65.7,
      userCount: 18
    },
    {
      id: 3,
      date: '2025-01-15',
      totalWasteKg: 920.7,
      recycledWasteKg: 610.5,
      recyclingRate: 66.3,
      userCount: 20
    },
    {
      id: 4,
      date: '2025-01-22',
      totalWasteKg: 1050.2,
      recycledWasteKg: 720.6,
      recyclingRate: 68.6,
      userCount: 22
    },
    {
      id: 5,
      date: '2025-01-29',
      totalWasteKg: 1120.8,
      recycledWasteKg: 790.3,
      recyclingRate: 70.5,
      userCount: 25
    },
    {
      id: 6,
      date: '2025-02-05',
      totalWasteKg: 1200.4,
      recycledWasteKg: 840.9,
      recyclingRate: 70.1,
      userCount: 27
    }
  ];
  
  ngOnInit(): void {
    // In a real app, would fetch analytics data based on selected range
  }
  
  onDateRangeChange(): void {
    // In a real app, would reload data based on selected range
    console.log('Date range changed to:', this.selectedDateRange);
  }
  
  getTotalWaste(): number {
    return this.analytics.reduce((total, item) => total + item.totalWasteKg, 0);
  }
  
  getTotalRecycledWaste(): number {
    return this.analytics.reduce((total, item) => total + item.recycledWasteKg, 0);
  }
  
  getAverageRecyclingRate(): number {
    return this.analytics.reduce((total, item) => total + item.recyclingRate, 0) / this.analytics.length;
  }
  
  getAverageUserCount(): number {
    return Math.round(this.analytics.reduce((total, item) => total + item.userCount, 0) / this.analytics.length);
  }
  
  getWasteTrend(): number {
    // Simplified trend calculation
    if (this.analytics.length < 2) return 0;
    
    const firstHalf = this.analytics.slice(0, Math.floor(this.analytics.length / 2));
    const secondHalf = this.analytics.slice(Math.floor(this.analytics.length / 2));
    
    const firstAvg = firstHalf.reduce((total, item) => total + item.totalWasteKg, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((total, item) => total + item.totalWasteKg, 0) / secondHalf.length;
    
    return ((secondAvg - firstAvg) / firstAvg) * 100;
  }
  
  getRecycledTrend(): number {
    // Simplified trend calculation
    if (this.analytics.length < 2) return 0;
    
    const firstHalf = this.analytics.slice(0, Math.floor(this.analytics.length / 2));
    const secondHalf = this.analytics.slice(Math.floor(this.analytics.length / 2));
    
    const firstAvg = firstHalf.reduce((total, item) => total + item.recycledWasteKg, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((total, item) => total + item.recycledWasteKg, 0) / secondHalf.length;
    
    return ((secondAvg - firstAvg) / firstAvg) * 100;
  }
  
  getRecyclingRateTrend(): number {
    // Simplified trend calculation
    if (this.analytics.length < 2) return 0;
    
    const firstHalf = this.analytics.slice(0, Math.floor(this.analytics.length / 2));
    const secondHalf = this.analytics.slice(Math.floor(this.analytics.length / 2));
    
    const firstAvg = firstHalf.reduce((total, item) => total + item.recyclingRate, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((total, item) => total + item.recyclingRate, 0) / secondHalf.length;
    
    return ((secondAvg - firstAvg) / firstAvg) * 100;
  }
  
  getUserCountTrend(): number {
    // Simplified trend calculation
    if (this.analytics.length < 2) return 0;
    
    const firstHalf = this.analytics.slice(0, Math.floor(this.analytics.length / 2));
    const secondHalf = this.analytics.slice(Math.floor(this.analytics.length / 2));
    
    const firstAvg = firstHalf.reduce((total, item) => total + item.userCount, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((total, item) => total + item.userCount, 0) / secondHalf.length;
    
    return ((secondAvg - firstAvg) / firstAvg) * 100;
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecyclingBin } from '../../core/models/recycling-bin.model';
import { WasteType } from '../../core/models/waste-type.model';

@Component({
  selector: 'app-bin-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bin-locations">
      <header class="page-header">
        <h1 class="page-title">Recycling Bin Locations</h1>
        <p class="page-subtitle">Find recycling bins near you</p>
      </header>
      
      <div class="search-container">
        <div class="search-box">
          <input type="text" [(ngModel)]="searchTerm" placeholder="Search by location..." class="search-input">
          <button class="search-button">Search</button>
        </div>
        
        <div class="filter-box">
          <label class="filter-label">Filter by waste type:</label>
          <div class="filter-options">
            <label *ngFor="let type of wasteTypes" class="filter-option">
              <input type="checkbox" [value]="type.id" (change)="toggleWasteTypeFilter(type.id)">
              <span class="filter-text">{{ type.name }}</span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="content-grid">
        <div class="map-container">
          <div class="map-placeholder">
            <div class="map-message">
              <span class="map-icon">🗺️</span>
              <p>Map showing recycling bin locations would be displayed here.</p>
              <p class="map-note">In a real implementation, this would be an interactive map using Leaflet or Google Maps.</p>
            </div>
          </div>
        </div>
        
        <div class="list-container">
          <h2 class="section-title">Nearby Recycling Bins</h2>
          
          <div class="bin-list">
            <div *ngFor="let bin of filteredBins" class="bin-card">
              <h3 class="bin-name">{{ bin.name }}</h3>
              <p class="bin-address">{{ bin.address }}</p>
              
              <div class="bin-types">
                <span class="bin-type-label">Accepts:</span>
                <div class="bin-type-tags">
                  <span *ngFor="let type of bin.wasteTypes.split(',')" class="bin-type-tag">{{ type }}</span>
                </div>
              </div>
              
              <div class="bin-capacity">
                <div class="capacity-label">Fill Level:</div>
                <div class="capacity-bar">
                  <div class="capacity-fill" [style.width.%]="bin.currentFillPercentage"
                       [ngClass]="{'low': bin.currentFillPercentage < 40, 
                                   'medium': bin.currentFillPercentage >= 40 && bin.currentFillPercentage < 70,
                                   'high': bin.currentFillPercentage >= 70}">
                  </div>
                </div>
                <div class="capacity-text">{{ bin.currentFillPercentage }}% full</div>
              </div>
              
              <div class="bin-actions">
                <button class="btn-directions">Get Directions</button>
                <button class="btn-details">More Details</button>
              </div>
            </div>
            
            <div *ngIf="filteredBins.length === 0" class="empty-bins">
              <p>No recycling bins match your search criteria.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bin-locations {
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
    
    .search-container {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .search-box {
      display: flex;
      gap: 0.5rem;
    }
    
    .search-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .search-button {
      padding: 0 1.5rem;
      background-color: #2E7D32;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .search-button:hover {
      background-color: #1b5e20;
    }
    
    .filter-box {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .filter-label {
      font-weight: 500;
      color: #333;
    }
    
    .filter-options {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .filter-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    
    .filter-text {
      font-size: 0.875rem;
    }
    
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    
    @media (max-width: 992px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .map-container, .list-container {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .map-placeholder {
      background-color: #f5f5f5;
      border-radius: 4px;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .map-message {
      text-align: center;
      padding: 2rem;
    }
    
    .map-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }
    
    .map-note {
      font-size: 0.875rem;
      color: #666;
      font-style: italic;
    }
    
    .section-title {
      font-size: 1.25rem;
      color: #333;
      margin: 0 0 1.25rem;
    }
    
    .bin-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 500px;
      overflow-y: auto;
    }
    
    .bin-card {
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 1rem;
      transition: box-shadow 0.3s;
    }
    
    .bin-card:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .bin-name {
      font-size: 1.125rem;
      margin: 0 0 0.25rem;
      color: #1976D2;
    }
    
    .bin-address {
      color: #666;
      margin: 0 0 0.75rem;
      font-size: 0.875rem;
    }
    
    .bin-types {
      margin-bottom: 0.75rem;
    }
    
    .bin-type-label {
      font-weight: 500;
      font-size: 0.875rem;
      color: #333;
      display: block;
      margin-bottom: 0.25rem;
    }
    
    .bin-type-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .bin-type-tag {
      background-color: #e8f5e9;
      color: #2E7D32;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }
    
    .bin-capacity {
      margin-bottom: 1rem;
    }
    
    .capacity-label {
      font-weight: 500;
      font-size: 0.875rem;
      color: #333;
      margin-bottom: 0.25rem;
    }
    
    .capacity-bar {
      height: 10px;
      background-color: #f5f5f5;
      border-radius: 5px;
      overflow: hidden;
    }
    
    .capacity-fill {
      height: 100%;
      border-radius: 5px;
    }
    
    .capacity-fill.low {
      background-color: #4caf50;
    }
    
    .capacity-fill.medium {
      background-color: #ff9800;
    }
    
    .capacity-fill.high {
      background-color: #f44336;
    }
    
    .capacity-text {
      text-align: right;
      font-size: 0.75rem;
      color: #666;
      margin-top: 0.25rem;
    }
    
    .bin-actions {
      display: flex;
      gap: 0.75rem;
    }
    
    .btn-directions, .btn-details {
      flex: 1;
      padding: 0.5rem;
      border-radius: 4px;
      border: none;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .btn-directions {
      background-color: #1976D2;
      color: white;
    }
    
    .btn-directions:hover {
      background-color: #1565c0;
    }
    
    .btn-details {
      background-color: #f5f5f5;
      color: #333;
    }
    
    .btn-details:hover {
      background-color: #e0e0e0;
    }
    
    .empty-bins {
      padding: 2rem;
      text-align: center;
      color: #666;
      background-color: #f9f9f9;
      border-radius: 6px;
    }
  `]
})
export class BinLocationsComponent implements OnInit {
  searchTerm: string = '';
  filteredWasteTypeIds: number[] = [];
  
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
    { id: 6, name: 'Hazardous', description: 'Hazardous waste materials', recyclable: false }
  ];
  
  ngOnInit(): void {
    // In a real app, would initialize map and load bin data
  }
  
  get filteredBins(): RecyclingBin[] {
    return this.recyclingBins.filter(bin => {
      // Filter by search term
      const matchesSearch = !this.searchTerm || 
        bin.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        bin.address.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Filter by waste types
      const matchesWasteTypes = this.filteredWasteTypeIds.length === 0 || 
        this.filteredWasteTypeIds.some(typeId => {
          const type = this.wasteTypes.find(t => t.id === typeId);
          return type && bin.wasteTypes.includes(type.name);
        });
      
      return matchesSearch && matchesWasteTypes;
    });
  }
  
  toggleWasteTypeFilter(wasteTypeId: number): void {
    const index = this.filteredWasteTypeIds.indexOf(wasteTypeId);
    if (index === -1) {
      this.filteredWasteTypeIds.push(wasteTypeId);
    } else {
      this.filteredWasteTypeIds.splice(index, 1);
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PickupStatus } from '../../core/models/pickup-schedule.model';

@Component({
  selector: 'app-pickups',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="pickups">
      <header class="page-header">
        <h1 class="page-title">Pickup Scheduling</h1>
        <p class="page-subtitle">Schedule waste pickups and track their status</p>
      </header>
      
      <div class="content-grid">
        <div class="form-container">
          <h2 class="section-title">Schedule New Pickup</h2>
          
          <form [formGroup]="pickupForm" (ngSubmit)="onSubmit()" class="pickup-form">
            <div class="form-group">
              <label for="address">Pickup Address</label>
              <input type="text" id="address" formControlName="address" class="form-control">
              <div class="form-error" *ngIf="pickupForm.get('address')?.invalid && pickupForm.get('address')?.touched">
                Address is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="pickupDate">Pickup Date & Time</label>
              <input type="datetime-local" id="pickupDate" formControlName="pickupDate" class="form-control">
              <div class="form-error" *ngIf="pickupForm.get('pickupDate')?.invalid && pickupForm.get('pickupDate')?.touched">
                Valid future date is required
              </div>
            </div>
            
            <div class="form-group">
              <label>Waste Types</label>
              <div class="checkbox-group">
                <label *ngFor="let type of wasteTypes" class="checkbox-option">
                  <input type="checkbox" [value]="type.name" (change)="toggleWasteType(type.name)">
                  <span>{{ type.name }}</span>
                </label>
              </div>
              <div class="form-error" *ngIf="selectedWasteTypes.length === 0 && pickupForm.touched">
                At least one waste type must be selected
              </div>
            </div>
            
            <div class="form-group">
              <label for="notes">Additional Notes</label>
              <textarea id="notes" formControlName="notes" rows="4" class="form-control"></textarea>
            </div>
            
            <button type="submit" class="btn-submit" [disabled]="pickupForm.invalid || selectedWasteTypes.length === 0">
              Schedule Pickup
            </button>
          </form>
        </div>
        
        <div class="schedule-container">
          <div class="section-header">
            <h2 class="section-title">My Pickups</h2>
            <div class="tab-controls">
              <button class="tab-button" [class.active]="activeTab === 'upcoming'" (click)="activeTab = 'upcoming'">
                Upcoming
              </button>
              <button class="tab-button" [class.active]="activeTab === 'past'" (click)="activeTab = 'past'">
                Past
              </button>
            </div>
          </div>
          
          <div class="pickup-list">
            <div *ngIf="activeTab === 'upcoming'">
              <div class="pickup-item" *ngFor="let pickup of upcomingPickups">
                <div class="pickup-status" [ngClass]="getStatusClass(pickup.status)">
                  {{ pickup.status }}
                </div>
                
                <div class="pickup-content">
                  <div class="pickup-header">
                    <span class="pickup-date">{{ pickup.pickupDate | date:'MMM d, y, h:mm a' }}</span>
                    <span class="pickup-actions">
                      <button class="btn-action cancel" *ngIf="pickup.status === 'SCHEDULED'"
                              (click)="updatePickupStatus(pickup.id, 'CANCELLED')">
                        Cancel
                      </button>
                    </span>
                  </div>
                  
                  <div class="pickup-details">
                    <div class="pickup-address">{{ pickup.address }}</div>
                    
                    <div class="pickup-types">
                      <span class="pickup-type-tag" *ngFor="let type of pickup.wasteTypes.split(',')">
                        {{ type }}
                      </span>
                    </div>
                    
                    <div class="pickup-notes" *ngIf="pickup.notes">
                      <strong>Notes:</strong> {{ pickup.notes }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="empty-message" *ngIf="upcomingPickups.length === 0">
                You have no upcoming pickups scheduled.
              </div>
            </div>
            
            <div *ngIf="activeTab === 'past'">
              <div class="pickup-item" *ngFor="let pickup of pastPickups">
                <div class="pickup-status" [ngClass]="getStatusClass(pickup.status)">
                  {{ pickup.status }}
                </div>
                
                <div class="pickup-content">
                  <div class="pickup-header">
                    <span class="pickup-date">{{ pickup.pickupDate | date:'MMM d, y, h:mm a' }}</span>
                  </div>
                  
                  <div class="pickup-details">
                    <div class="pickup-address">{{ pickup.address }}</div>
                    
                    <div class="pickup-types">
                      <span class="pickup-type-tag" *ngFor="let type of pickup.wasteTypes.split(',')">
                        {{ type }}
                      </span>
                    </div>
                    
                    <div class="pickup-notes" *ngIf="pickup.notes">
                      <strong>Notes:</strong> {{ pickup.notes }}
                    </div>
                    
                    <div class="pickup-completed" *ngIf="pickup.completedAt">
                      <strong>Completed:</strong> {{ pickup.completedAt | date:'medium' }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="empty-message" *ngIf="pastPickups.length === 0">
                You have no past pickups.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pickups {
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
    
    .form-container, .schedule-container {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .section-title {
      font-size: 1.25rem;
      color: #333;
      margin: 0 0 1.25rem;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    
    .pickup-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    label {
      font-weight: 500;
      color: #333;
    }
    
    .form-control {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    .form-control:focus {
      border-color: #2E7D32;
      outline: none;
    }
    
    .form-error {
      color: #d32f2f;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .checkbox-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    
    .btn-submit {
      padding: 0.75rem;
      background-color: #2E7D32;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 0.5rem;
    }
    
    .btn-submit:hover {
      background-color: #1b5e20;
    }
    
    .btn-submit:disabled {
      background-color: #aed581;
      cursor: not-allowed;
    }
    
    .tab-controls {
      display: flex;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .tab-button {
      padding: 0.5rem 1rem;
      background: none;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 0.875rem;
    }
    
    .tab-button.active {
      background-color: #2E7D32;
      color: white;
    }
    
    .pickup-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .pickup-item {
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      overflow: hidden;
      display: flex;
    }
    
    .pickup-status {
      padding: 1rem 0.5rem;
      writing-mode: vertical-lr;
      text-orientation: mixed;
      transform: rotate(180deg);
      font-weight: bold;
      font-size: 0.75rem;
      text-transform: uppercase;
      text-align: center;
      min-width: 30px;
    }
    
    .pickup-status.scheduled {
      background-color: #e3f2fd;
      color: #1976D2;
    }
    
    .pickup-status.in-progress {
      background-color: #fff8e1;
      color: #FF8F00;
    }
    
    .pickup-status.completed {
      background-color: #e8f5e9;
      color: #2E7D32;
    }
    
    .pickup-status.cancelled {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    .pickup-content {
      flex: 1;
      padding: 1rem;
    }
    
    .pickup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 0.75rem;
    }
    
    .pickup-date {
      font-weight: 500;
      color: #333;
    }
    
    .pickup-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-action {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
      border: none;
      transition: background-color 0.3s;
    }
    
    .btn-action.cancel {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    .btn-action.cancel:hover {
      background-color: #ffcdd2;
    }
    
    .pickup-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .pickup-address {
      font-weight: 500;
    }
    
    .pickup-types {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }
    
    .pickup-type-tag {
      background-color: #f5f5f5;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      color: #333;
    }
    
    .pickup-notes, .pickup-completed {
      font-size: 0.875rem;
      color: #666;
    }
    
    .empty-message {
      padding: 2rem;
      text-align: center;
      color: #666;
      background-color: #f9f9f9;
      border-radius: 6px;
    }
  `]
})
export class PickupsComponent {
  pickupForm: FormGroup;
  selectedWasteTypes: string[] = [];
  activeTab: 'upcoming' | 'past' = 'upcoming';
  
  wasteTypes = [
    { id: 1, name: 'Plastic' },
    { id: 2, name: 'Paper' },
    { id: 3, name: 'Glass' },
    { id: 4, name: 'Organic' },
    { id: 5, name: 'Electronic' },
    { id: 6, name: 'Hazardous' }
  ];
  
  upcomingPickups = [
    {
      id: 1,
      address: '123 Residential St, Apt 4B',
      pickupDate: new Date(Date.now() + 2 * 86400000).toISOString(), // 2 days from now
      wasteTypes: 'Plastic,Paper',
      status: 'SCHEDULED',
      requestedAt: new Date().toISOString(),
      completedAt: null,
      notes: 'Please pickup before noon'
    },
    {
      id: 2,
      address: '456 Home Ave, Suite 7',
      pickupDate: new Date(Date.now() + 3 * 86400000).toISOString(), // 3 days from now
      wasteTypes: 'Electronic',
      status: 'SCHEDULED',
      requestedAt: new Date().toISOString(),
      completedAt: null,
      notes: 'Old computer equipment'
    }
  ];
  
  pastPickups = [
    {
      id: 3,
      address: '123 Residential St, Apt 4B',
      pickupDate: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
      wasteTypes: 'Glass,Organic',
      status: 'COMPLETED',
      requestedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      completedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      notes: 'Food containers and waste'
    },
    {
      id: 4,
      address: '456 Home Ave, Suite 7',
      pickupDate: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
      wasteTypes: 'Hazardous',
      status: 'COMPLETED',
      requestedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      completedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      notes: 'Old paint and chemicals'
    }
  ];
  
  constructor(private fb: FormBuilder) {
    this.pickupForm = this.fb.group({
      address: ['', Validators.required],
      pickupDate: ['', [Validators.required]],
      notes: ['']
    });
  }
  
  toggleWasteType(type: string): void {
    const index = this.selectedWasteTypes.indexOf(type);
    if (index === -1) {
      this.selectedWasteTypes.push(type);
    } else {
      this.selectedWasteTypes.splice(index, 1);
    }
  }
  
  onSubmit(): void {
    if (this.pickupForm.valid && this.selectedWasteTypes.length > 0) {
      const formValue = this.pickupForm.value;
      
      // Create new pickup
      const newPickup = {
        id: this.upcomingPickups.length + this.pastPickups.length + 1,
        address: formValue.address,
        pickupDate: new Date(formValue.pickupDate).toISOString(),
        wasteTypes: this.selectedWasteTypes.join(','),
        status: 'SCHEDULED',
        requestedAt: new Date().toISOString(),
        completedAt: null,
        notes: formValue.notes
      };
      
      // Add to upcoming pickups
      this.upcomingPickups.push(newPickup);
      
      // Reset form
      this.pickupForm.reset();
      this.selectedWasteTypes = [];
    }
  }
  
  updatePickupStatus(id: number, status: string): void {
    const pickup = this.upcomingPickups.find(p => p.id === id);
    if (pickup) {
      pickup.status = status;
      
      if (status === 'CANCELLED') {
        // Move to past pickups
        this.pastPickups.push({...pickup, completedAt: new Date().toISOString()});
        this.upcomingPickups = this.upcomingPickups.filter(p => p.id !== id);
      }
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'SCHEDULED': return 'scheduled';
      case 'IN_PROGRESS': return 'in-progress';
      case 'COMPLETED': return 'completed';
      case 'CANCELLED': return 'cancelled';
      default: return '';
    }
  }
}
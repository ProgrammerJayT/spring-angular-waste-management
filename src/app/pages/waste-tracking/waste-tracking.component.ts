import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WasteType } from '../../core/models/waste-type.model';
import { DisposalMethod } from '../../core/models/waste-record.model';

@Component({
  selector: 'app-waste-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="waste-tracking">
      <header class="page-header">
        <h1 class="page-title">Waste Tracking</h1>
        <p class="page-subtitle">Record and track your waste disposal activities</p>
      </header>
      
      <div class="content-grid">
        <div class="form-container">
          <h2 class="section-title">Log New Waste</h2>
          
          <form [formGroup]="wasteForm" (ngSubmit)="onSubmit()" class="waste-form">
            <div class="form-group">
              <label for="wasteType">Waste Type</label>
              <select id="wasteType" formControlName="wasteType" class="form-control">
                <option value="">Select waste type</option>
                <option *ngFor="let type of wasteTypes" [value]="type.id">{{ type.name }}</option>
              </select>
              <div class="form-error" *ngIf="wasteForm.get('wasteType')?.invalid && wasteForm.get('wasteType')?.touched">
                Waste type is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="weight">Weight (kg)</label>
              <input type="number" id="weight" formControlName="weight" min="0.1" step="0.1" class="form-control">
              <div class="form-error" *ngIf="wasteForm.get('weight')?.invalid && wasteForm.get('weight')?.touched">
                Valid weight is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="disposalMethod">Disposal Method</label>
              <select id="disposalMethod" formControlName="disposalMethod" class="form-control">
                <option value="">Select disposal method</option>
                <option *ngFor="let method of disposalMethods" [value]="method">{{ method }}</option>
              </select>
              <div class="form-error" *ngIf="wasteForm.get('disposalMethod')?.invalid && wasteForm.get('disposalMethod')?.touched">
                Disposal method is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="notes">Notes</label>
              <textarea id="notes" formControlName="notes" rows="4" class="form-control"></textarea>
            </div>
            
            <button type="submit" class="btn-submit" [disabled]="wasteForm.invalid">Log Waste</button>
          </form>
        </div>
        
        <div class="history-container">
          <div class="section-header">
            <h2 class="section-title">Waste History</h2>
            <div class="filter-controls">
              <select [(ngModel)]="filterType" class="filter-select">
                <option value="">All Types</option>
                <option *ngFor="let type of wasteTypes" [value]="type.id">{{ type.name }}</option>
              </select>
              
              <select [(ngModel)]="filterMethod" class="filter-select">
                <option value="">All Methods</option>
                <option *ngFor="let method of disposalMethods" [value]="method">{{ method }}</option>
              </select>
            </div>
          </div>
          
          <div class="record-list">
            <div class="record-item" *ngFor="let record of filteredWasteRecords">
              <div class="record-header">
                <span class="record-type-badge" [ngClass]="{'recyclable': getWasteTypeById(record.wasteType?.id)?.recyclable}">
                  {{ getWasteTypeById(record.wasteType?.id)?.name || 'Unknown' }}
                </span>
                <span class="record-date">{{ record.disposedAt | date:'medium' }}</span>
              </div>
              
              <div class="record-body">
                <div class="record-detail">
                  <span class="detail-label">Weight:</span>
                  <span class="detail-value">{{ record.weightKg }} kg</span>
                </div>
                
                <div class="record-detail">
                  <span class="detail-label">Method:</span>
                  <span class="detail-value">{{ record.disposalMethod }}</span>
                </div>
                
                <div class="record-notes" *ngIf="record.notes">
                  <span class="notes-label">Notes:</span>
                  <p class="notes-content">{{ record.notes }}</p>
                </div>
              </div>
            </div>
            
            <div class="empty-records" *ngIf="filteredWasteRecords.length === 0">
              <p>No waste records found. Start logging your waste disposal activities!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .waste-tracking {
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
      grid-template-columns: 1fr 2fr;
      gap: 1.5rem;
    }
    
    @media (max-width: 992px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .form-container, .history-container {
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
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .waste-form {
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
    
    .filter-controls {
      display: flex;
      gap: 0.75rem;
    }
    
    .filter-select {
      padding: 0.375rem 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    
    .record-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .record-item {
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      overflow: hidden;
      transition: box-shadow 0.3s;
    }
    
    .record-item:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    .record-header {
      background-color: #f5f5f5;
      padding: 0.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .record-type-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      background-color: #e0e0e0;
      color: #333;
    }
    
    .record-type-badge.recyclable {
      background-color: #e8f5e9;
      color: #2E7D32;
    }
    
    .record-date {
      font-size: 0.75rem;
      color: #666;
    }
    
    .record-body {
      padding: 0.75rem;
    }
    
    .record-detail {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .detail-label {
      font-weight: 500;
      color: #666;
      min-width: 70px;
    }
    
    .record-notes {
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      border-top: 1px dashed #e0e0e0;
    }
    
    .notes-label {
      font-weight: 500;
      color: #666;
      display: block;
      margin-bottom: 0.25rem;
    }
    
    .notes-content {
      margin: 0;
      color: #333;
      font-size: 0.875rem;
    }
    
    .empty-records {
      padding: 2rem;
      text-align: center;
      color: #666;
      background-color: #f9f9f9;
      border-radius: 6px;
    }
  `]
})
export class WasteTrackingComponent {
  wasteForm: FormGroup;
  filterType: string = '';
  filterMethod: string = '';
  
  wasteTypes: WasteType[] = [
    { id: 1, name: 'Plastic', description: 'Plastic waste materials', recyclable: true },
    { id: 2, name: 'Paper', description: 'Paper waste materials', recyclable: true },
    { id: 3, name: 'Glass', description: 'Glass waste materials', recyclable: true },
    { id: 4, name: 'Organic', description: 'Food and garden waste', recyclable: true },
    { id: 5, name: 'Electronic', description: 'Electronic waste materials', recyclable: true },
    { id: 6, name: 'Hazardous', description: 'Hazardous waste materials', recyclable: false },
    { id: 7, name: 'General', description: 'General non-recyclable waste', recyclable: false }
  ];
  
  disposalMethods = Object.values(DisposalMethod);
  
  wasteRecords: any[] = [
    {
      id: 1,
      wasteType: { id: 1, name: 'Plastic' },
      weightKg: 2.5,
      disposalMethod: DisposalMethod.RECYCLED,
      disposedAt: new Date().toISOString(),
      notes: 'Plastic bottles and containers'
    },
    {
      id: 2,
      wasteType: { id: 2, name: 'Paper' },
      weightKg: 1.8,
      disposalMethod: DisposalMethod.RECYCLED,
      disposedAt: new Date(Date.now() - 86400000).toISOString(),
      notes: 'Newspapers and magazines'
    },
    {
      id: 3,
      wasteType: { id: 4, name: 'Organic' },
      weightKg: 3.2,
      disposalMethod: DisposalMethod.COMPOSTED,
      disposedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      notes: 'Food scraps and garden waste'
    }
  ];
  
  constructor(private fb: FormBuilder) {
    this.wasteForm = this.fb.group({
      wasteType: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0.1)]],
      disposalMethod: ['', Validators.required],
      notes: ['']
    });
  }
  
  get filteredWasteRecords() {
    return this.wasteRecords.filter(record => {
      let matchesType = true;
      let matchesMethod = true;
      
      if (this.filterType) {
        matchesType = record.wasteType.id.toString() === this.filterType;
      }
      
      if (this.filterMethod) {
        matchesMethod = record.disposalMethod === this.filterMethod;
      }
      
      return matchesType && matchesMethod;
    });
  }
  
  onSubmit() {
    if (this.wasteForm.valid) {
      const formValue = this.wasteForm.value;
      
      // Create new waste record
      const newRecord = {
        id: this.wasteRecords.length + 1,
        wasteType: this.getWasteTypeById(parseInt(formValue.wasteType)),
        weightKg: formValue.weight,
        disposalMethod: formValue.disposalMethod,
        disposedAt: new Date().toISOString(),
        notes: formValue.notes
      };
      
      // Add to the beginning of the array
      this.wasteRecords.unshift(newRecord);
      
      // Reset form
      this.wasteForm.reset();
    }
  }
  
  getWasteTypeById(id: number): WasteType | undefined {
    return this.wasteTypes.find(type => type.id === id);
  }
}
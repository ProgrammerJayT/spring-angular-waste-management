import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="profile">
      <header class="page-header">
        <h1 class="page-title">My Profile</h1>
        <p class="page-subtitle">Manage your account and preferences</p>
      </header>
      
      <div class="content-grid">
        <div class="profile-container">
          <div class="profile-header">
            <div class="profile-avatar">
              <span class="avatar-text">{{ getInitials(user.username) }}</span>
            </div>
            <div class="profile-info">
              <h2 class="profile-name">{{ user.username }}</h2>
              <p class="profile-email">{{ user.email }}</p>
              <p class="profile-role">Role: {{ user.role }}</p>
              <p class="profile-joined">Member since: {{ user.createdAt | date:'longDate' }}</p>
            </div>
          </div>
          
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-value">{{ wasteRecordCount }}</span>
              <span class="stat-label">Waste Records</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ totalRecycled }}</span>
              <span class="stat-label">kg Recycled</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ pickupsScheduled }}</span>
              <span class="stat-label">Pickups Scheduled</span>
            </div>
          </div>
        </div>
        
        <div class="settings-container">
          <h2 class="section-title">Account Settings</h2>
          
          <div class="settings-tabs">
            <button class="tab-button" [class.active]="activeTab === 'profile'" (click)="activeTab = 'profile'">
              Profile
            </button>
            <button class="tab-button" [class.active]="activeTab === 'password'" (click)="activeTab = 'password'">
              Password
            </button>
            <button class="tab-button" [class.active]="activeTab === 'preferences'" (click)="activeTab = 'preferences'">
              Preferences
            </button>
          </div>
          
          <div class="settings-content">
            <form *ngIf="activeTab === 'profile'" [formGroup]="profileForm" (ngSubmit)="updateProfile()" class="settings-form">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" formControlName="username" class="form-control">
                <div class="form-error" *ngIf="profileForm.get('username')?.invalid && profileForm.get('username')?.touched">
                  Username is required
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" formControlName="email" class="form-control">
                <div class="form-error" *ngIf="profileForm.get('email')?.invalid && profileForm.get('email')?.touched">
                  Valid email is required
                </div>
              </div>
              
              <button type="submit" class="btn-submit" [disabled]="profileForm.invalid || !profileForm.dirty">
                Save Changes
              </button>
            </form>
            
            <form *ngIf="activeTab === 'password'" [formGroup]="passwordForm" (ngSubmit)="updatePassword()" class="settings-form">
              <div class="form-group">
                <label for="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" formControlName="currentPassword" class="form-control">
                <div class="form-error" *ngIf="passwordForm.get('currentPassword')?.invalid && passwordForm.get('currentPassword')?.touched">
                  Current password is required
                </div>
              </div>
              
              <div class="form-group">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" formControlName="newPassword" class="form-control">
                <div class="form-error" *ngIf="passwordForm.get('newPassword')?.invalid && passwordForm.get('newPassword')?.touched">
                  Password must be at least 8 characters
                </div>
              </div>
              
              <div class="form-group">
                <label for="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" formControlName="confirmPassword" class="form-control">
                <div class="form-error" *ngIf="passwordForm.get('confirmPassword')?.invalid && passwordForm.get('confirmPassword')?.touched">
                  Passwords must match
                </div>
              </div>
              
              <button type="submit" class="btn-submit" [disabled]="passwordForm.invalid">
                Update Password
              </button>
            </form>
            
            <form *ngIf="activeTab === 'preferences'" [formGroup]="preferencesForm" (ngSubmit)="updatePreferences()" class="settings-form">
              <div class="form-group">
                <label>Notification Preferences</label>
                <div class="checkbox-group">
                  <label class="checkbox-option">
                    <input type="checkbox" formControlName="emailNotifications">
                    <span>Email notifications</span>
                  </label>
                  
                  <label class="checkbox-option">
                    <input type="checkbox" formControlName="smsNotifications">
                    <span>SMS notifications</span>
                  </label>
                </div>
              </div>
              
              <div class="form-group">
                <label for="language">Language</label>
                <select id="language" formControlName="language" class="form-control">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              
              <button type="submit" class="btn-submit" [disabled]="!preferencesForm.dirty">
                Save Preferences
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div class="data-container">
        <h2 class="section-title">Data Management</h2>
        
        <div class="data-actions">
          <button class="btn-data export">Export My Data</button>
          <button class="btn-data delete">Delete Account</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile {
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
    
    .profile-container, .settings-container, .data-container {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .profile-header {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #2E7D32;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      font-weight: bold;
    }
    
    .profile-info {
      flex: 1;
    }
    
    .profile-name {
      font-size: 1.5rem;
      margin: 0 0 0.25rem;
      color: #333;
    }
    
    .profile-email {
      color: #666;
      margin: 0 0 0.5rem;
    }
    
    .profile-role, .profile-joined {
      color: #666;
      font-size: 0.875rem;
      margin: 0 0 0.25rem;
    }
    
    .profile-stats {
      display: flex;
      justify-content: space-around;
      text-align: center;
      border-top: 1px solid #f0f0f0;
      padding-top: 1.5rem;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2E7D32;
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: #666;
    }
    
    .section-title {
      font-size: 1.25rem;
      color: #333;
      margin: 0 0 1.25rem;
    }
    
    .settings-tabs {
      display: flex;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .tab-button {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      color: #666;
      transition: all 0.3s;
      position: relative;
    }
    
    .tab-button.active {
      color: #2E7D32;
      font-weight: 500;
    }
    
    .tab-button.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #2E7D32;
    }
    
    .settings-form {
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
      flex-direction: column;
      gap: 0.75rem;
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
    
    .data-actions {
      display: flex;
      gap: 1rem;
    }
    
    .btn-data {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .btn-data.export {
      background-color: #f5f5f5;
      color: #333;
    }
    
    .btn-data.export:hover {
      background-color: #e0e0e0;
    }
    
    .btn-data.delete {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    .btn-data.delete:hover {
      background-color: #ffcdd2;
    }
  `]
})
export class ProfileComponent {
  activeTab: 'profile' | 'password' | 'preferences' = 'profile';
  profileForm: FormGroup;
  passwordForm: FormGroup;
  preferencesForm: FormGroup;
  
  user: User = {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    role: 'USER' as any,
    createdAt: new Date(2024, 5, 15).toISOString()
  };
  
  wasteRecordCount: number = 12;
  totalRecycled: number = 87.5;
  pickupsScheduled: number = 3;
  
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
    
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
    
    this.preferencesForm = this.fb.group({
      emailNotifications: [true],
      smsNotifications: [false],
      language: ['en']
    });
  }
  
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    
    return null;
  }
  
  getInitials(name: string): string {
    return name.charAt(0).toUpperCase();
  }
  
  updateProfile(): void {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      
      // Update user (in a real app, this would be an API call)
      this.user.username = formValue.username;
      this.user.email = formValue.email;
      
      // Reset form state
      this.profileForm.markAsPristine();
      
      // Show success message
      alert('Profile updated successfully');
    }
  }
  
  updatePassword(): void {
    if (this.passwordForm.valid) {
      // In a real app, this would be an API call
      
      // Reset form
      this.passwordForm.reset();
      
      // Show success message
      alert('Password updated successfully');
    }
  }
  
  updatePreferences(): void {
    if (this.preferencesForm.valid) {
      // In a real app, this would be an API call
      
      // Reset form state
      this.preferencesForm.markAsPristine();
      
      // Show success message
      alert('Preferences updated successfully');
    }
  }
}
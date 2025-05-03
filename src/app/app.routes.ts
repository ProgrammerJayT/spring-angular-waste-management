import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'waste-tracking',
    loadComponent: () => import('./pages/waste-tracking/waste-tracking.component').then(m => m.WasteTrackingComponent)
  },
  {
    path: 'bin-locations',
    loadComponent: () => import('./pages/bin-locations/bin-locations.component').then(m => m.BinLocationsComponent)
  },
  {
    path: 'pickups',
    loadComponent: () => import('./pages/pickups/pickups.component').then(m => m.PickupsComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
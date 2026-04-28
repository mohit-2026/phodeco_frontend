import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'vendors', loadChildren: () => import('./pages/vendor-search/vendor-search.module').then(m => m.VendorSearchModule) },
  { path: 'vendors/:id', loadChildren: () => import('./pages/vendor-detail/vendor-detail.module').then(m => m.VendorDetailModule) },
  { path: 'my-bookings', loadChildren: () => import('./pages/my-bookings/my-bookings.module').then(m => m.MyBookingsModule), canActivate: [AuthGuard] },
  { path: 'vendor/dashboard', loadChildren: () => import('./pages/vendor-dashboard/vendor-dashboard.module').then(m => m.VendorDashboardModule), canActivate: [AuthGuard] },
  { path: 'vendor/bookings', loadChildren: () => import('./pages/vendor-bookings/vendor-bookings.module').then(m => m.VendorBookingsModule), canActivate: [AuthGuard] },
  { path: 'vendor/profile', loadChildren: () => import('./pages/vendor-profile/vendor-profile.module').then(m => m.VendorProfileModule), canActivate: [AuthGuard] },
  { path: 'vendor/services', loadChildren: () => import('./pages/vendor-services/vendor-services.module').then(m => m.VendorServicesModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
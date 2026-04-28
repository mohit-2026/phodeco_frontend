import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VendorDashboardRoutingModule } from './vendor-dashboard-routing.module';
import { VendorDashboardComponent } from './vendor-dashboard.component';

@NgModule({
  declarations: [VendorDashboardComponent],
  imports: [CommonModule, RouterModule, VendorDashboardRoutingModule]
})
export class VendorDashboardModule {}
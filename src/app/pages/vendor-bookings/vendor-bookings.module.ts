import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VendorBookingsRoutingModule } from './vendor-bookings-routing.module';
import { VendorBookingsComponent } from './vendor-bookings.component';

@NgModule({
  declarations: [VendorBookingsComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, VendorBookingsRoutingModule]
})
export class VendorBookingsModule {}
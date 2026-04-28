import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VendorServicesRoutingModule } from './vendor-services-routing.module';
import { VendorServicesComponent } from './vendor-services.component';

@NgModule({
  declarations: [VendorServicesComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, VendorServicesRoutingModule]
})
export class VendorServicesModule {}
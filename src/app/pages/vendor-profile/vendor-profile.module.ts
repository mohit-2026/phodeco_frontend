import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VendorProfileRoutingModule } from './vendor-profile-routing.module';
import { VendorProfileComponent } from './vendor-profile.component';

@NgModule({
  declarations: [VendorProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, VendorProfileRoutingModule]
})
export class VendorProfileModule {}
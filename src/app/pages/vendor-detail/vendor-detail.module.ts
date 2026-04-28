import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VendorDetailRoutingModule } from './vendor-detail-routing.module';
import { VendorDetailComponent } from './vendor-detail.component';

@NgModule({
  declarations: [VendorDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    VendorDetailRoutingModule
  ]
})
export class VendorDetailModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VendorSearchRoutingModule } from './vendor-search-routing.module';
import { VendorSearchComponent } from './vendor-search.component';

@NgModule({
  declarations: [VendorSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    VendorSearchRoutingModule
  ]
})
export class VendorSearchModule {}
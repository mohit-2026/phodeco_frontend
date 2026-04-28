import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorBookingsComponent } from './vendor-bookings.component';

const routes: Routes = [{ path: '', component: VendorBookingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorBookingsRoutingModule {}
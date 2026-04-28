import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorServicesComponent } from './vendor-services.component';

const routes: Routes = [{ path: '', component: VendorServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorServicesRoutingModule {}
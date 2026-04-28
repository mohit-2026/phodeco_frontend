import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDetailComponent } from './vendor-detail.component';

const routes: Routes = [{ path: '', component: VendorDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDetailRoutingModule {}
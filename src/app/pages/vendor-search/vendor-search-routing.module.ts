import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorSearchComponent } from './vendor-search.component';

const routes: Routes = [{ path: '', component: VendorSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorSearchRoutingModule {}
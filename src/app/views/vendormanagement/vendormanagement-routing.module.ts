import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendormanagementComponent } from './vendormanagement.component';

const routes: Routes = [
  {
    path: '',
    component: VendormanagementComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorManagementRoutingModule {
}

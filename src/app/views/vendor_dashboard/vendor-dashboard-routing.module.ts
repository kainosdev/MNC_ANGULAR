import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorDashboardComponent } from './vendor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: VendorDashboardComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDashboardRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BidmanagementComponent } from './bid-management.component';

const routes: Routes = [
  {
    path: '',
    component: BidmanagementComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidmanagementRoutingModule {
}
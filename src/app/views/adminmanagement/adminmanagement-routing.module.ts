import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminmanagementComponent } from './adminmanagement.component';

const routes: Routes = [
  {
    path: '',
    component: AdminmanagementComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagementRoutingModule {
}

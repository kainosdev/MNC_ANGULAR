import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpDashboardComponent } from './emp-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: EmpDashboardComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpDashboardRoutingModule {
}

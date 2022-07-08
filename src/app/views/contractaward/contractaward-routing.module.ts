import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractawardComponent } from './contractaward.component';

const routes: Routes = [
  {
    path: '',
    component: ContractawardComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractawardRoutingModule {
}

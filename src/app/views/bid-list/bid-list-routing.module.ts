import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BidListComponent } from './bid-list.component';

const routes: Routes = [
  {
    path: '',
    component: BidListComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidListRoutingModule {
}

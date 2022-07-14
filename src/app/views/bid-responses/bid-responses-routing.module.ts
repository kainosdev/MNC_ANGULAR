import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BidResponsesComponent } from './bid-responses.component';

const routes: Routes = [
  {
    path: '',
    component: BidResponsesComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidResponsesRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewBidresponsesComponent } from './view-bidresponses.component';

const routes: Routes = [
  {
    path: '',
    component: ViewBidresponsesComponent,
    data: {
      // title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBidresponsesRoutingModule {
}
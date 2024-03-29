import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
// import { ToastrModule } from 'ngx-toastr';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
  
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ViewBidresponsesRoutingModule } from './view-bidresponses-routing.module';
import { ViewBidresponsesComponent } from './view-bidresponses.component';
import {DataTablesModule} from 'angular-datatables';




// import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    // ToastrModule.forRoot({
    //   positionClass: 'toast-center-center',
    //   timeOut: 2000,
    // }),
    ViewBidresponsesRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    FormsModule,
    TextMaskModule,
    DataTablesModule,
    // WidgetsModule
  ],
  declarations: [ViewBidresponsesComponent]
})
export class ViewBidresponsesModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { BidResponsesRoutingModule } from './bid-responses-routing.module';
import { BidResponsesComponent } from './bid-responses.component';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  imports: [
    BidResponsesRoutingModule,
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
    DataTablesModule
    // WidgetsModule
  ],
  declarations: [BidResponsesComponent]
})
export class BidResponsesModule { }

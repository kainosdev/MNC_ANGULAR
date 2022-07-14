import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';


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

import { VendorListRoutingModule } from './vendor-list-routing.module';
import { VendorListComponent } from './vendor-list.component';

@NgModule({
  imports: [
    VendorListRoutingModule,
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
    DataTablesModule,
    
    // WidgetsModule
  ],
  declarations: [VendorListComponent]
})
export class VendorListModule { }

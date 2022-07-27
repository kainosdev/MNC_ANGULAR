import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatTableModule } from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule }   from '@angular/forms';


// import {  MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatSortModule, MatButtonModule } from '@angular/material';

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

import { EmpDashboardRoutingModule } from './emp-dashboard-routing.module';
import { EmpDashboardComponent } from './emp-dashboard.component';
import {DataTablesModule} from 'angular-datatables';
import { AccordionModule } from "../../lib/accordion/accordion.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




@NgModule({
  imports: [
    EmpDashboardRoutingModule,
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
    AccordionModule,
    TableModule,
    DataTablesModule,
    MatPaginatorModule,
    MatTableModule,
  //   MatProgressSpinnerModule,
  //   MatInputModule,
  //   MatButtonModule,
  //  MatFormFieldModule,
  //   BrowserAnimationsModule,

//     FormsModule,
//     HttpClientModule,
MatSortModule,

    // // WidgetsModule
  ],
  declarations: [EmpDashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmpdashboardModule { }

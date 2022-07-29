import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AccordionModule } from "../../lib/accordion/accordion.module";
import {  MatTableModule } from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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

import { BidListRoutingModule } from './View-Bid-routing.module';
import { BidListComponent } from './View-Bid.component';
import {DataTablesModule} from 'angular-datatables';


import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';
// import { ProgressComponent } from '../../../components/progress/progress.component';
//import { DndDirective } from '../../directives/dnd.directive';


@NgModule({
  imports: [
    BidListRoutingModule,
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
    AccordionModule,
      MatTabsModule,
      SharedModule,
      MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  declarations: [BidListComponent
    //ProgressComponent
    //,DndDirective
  ]
})
export class BidListModule { }

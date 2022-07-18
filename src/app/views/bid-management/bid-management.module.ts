import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';

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

import { BidmanagementRoutingModule } from './bid-management-routing.module';
import { BidmanagementComponent} from './bid-management.component';

import { AccordionModule } from "../../lib/accordion/accordion.module";
import {MatTabsModule} from '@angular/material/tabs';
// import {DataTablesModule} from 'angular-datatables';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
    imports: [
      BidmanagementRoutingModule,
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
      AccordionModule,
      MatTabsModule,
      DataTablesModule,
      CKEditorModule
      
     
      // WidgetsModule
    ],

    declarations: [BidmanagementComponent]
  })
  export class BidmanagementModule { }

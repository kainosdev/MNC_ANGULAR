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

import { BidmanagementRoutingModule } from './bid-management-routing.module';
import { BidmanagementComponent} from './bid-management.component';

import { AccordionModule } from "../../lib/accordion/accordion.module";
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';
import { ProgressComponent } from '../../../components/progress/progress.component';
import { DndDirective } from '../../directives/dnd.directive';


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
      SharedModule
      // WidgetsModule
    ],

    declarations: [BidmanagementComponent,ProgressComponent,DndDirective]
  })
  export class BidmanagementModule { }

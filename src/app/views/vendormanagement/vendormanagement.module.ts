import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AccordionModule } from "../../lib/accordion/accordion.module";

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

import { VendorManagementRoutingModule } from './vendormanagement-routing.module';
import { VendormanagementComponent } from './vendormanagement.component';



// import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    VendorManagementRoutingModule,
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
    TextMaskModule,
    AccordionModule
    // WidgetsModule
  ],
  declarations: [VendormanagementComponent]
})
export class VendorModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { CKEditorModule } from 'ckeditor4-angular';



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
import { ContractawardRoutingModule } from './contractaward-routing.module';
import { ContractawardComponent } from './contractaward.component';

@NgModule({
  imports: [
    ContractawardRoutingModule,
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
    CKEditorModule,
   
    // WidgetsModule
  ],
  declarations: [ContractawardComponent]
})
export class ContractawardModule { }

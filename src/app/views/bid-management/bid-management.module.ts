import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgWizardModule, NgWizardConfig, THEME, TOOLBAR_BUTTON_POSITION } from 'ng-wizard';

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
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
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
      NgWizardModule.forRoot(ngWizardConfig)
      // WidgetsModule
    ],
    declarations: [BidmanagementComponent]
  })
  export class BidmanagementModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';



// import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    // ToastrModule.forRoot({
    //   positionClass: 'toast-center-center',
    //   timeOut: 2000,
    // }),
    RegisterRoutingModule,
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
    FormsModule
    // WidgetsModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {
}

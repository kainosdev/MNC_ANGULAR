import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DataTablesModule} from 'angular-datatables';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from './shared/shared.module';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
// import { ToastrModule } from 'ngx-toastr';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';


// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
  
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  
  SidebarModule,
  TabsModule,
  UtilitiesModule

 
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LogoutComponent } from './views/logout/logout.component';
// import { RegistrationformComponent } from './registrationform/registrationform.component';
// import { BidmanagementComponent } from './bidmanagement/bidmanagement.component';
// import { BidmanagementComponent } from './views/bid-management/bid-management.component';
import { TesingComponent } from './tesing/tesing.component';
import { BidResponsesComponent } from './views/bid-responses/bid-responses.component';
import { BidListComponent } from './views/View-Bid/View-Bid.component';
import { ViewBidresponsesComponent } from './views/view-bidresponses/view-bidresponses.component';
// import { BidlistComponent } from './bidlist/bidlist.component';

// import { VendorListComponent } from './views/vendor-list/vendor-list.component';

// import { AdminmanagementComponent } from './views/adminmanagement/adminmanagement.component';
// import { VendormanagementComponent } from './views/vendormanagement/vendormanagement.component';
// import { VendormanagementComponent } from './vendormanagement/vendormanagement.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];



@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, LogoutComponent, 
    // RegistrationformComponent,
     TesingComponent
      // ViewBidresponsesComponent, 
    //  BidListComponent, 
    //  BidResponsesComponent, 
    // BidlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
   
    
    // ToastrModule.forRoot({
    //   positionClass: 'toast-center-center',
    //   timeOut: 2000,
    // }),

  ],
 
  providers: [
    // {
      // provide: LocationStrategy,
      // useClass: HashLocationStrategy,
    // },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

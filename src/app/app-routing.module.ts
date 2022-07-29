import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { AdminmanagementComponent } from './views/adminmanagement/adminmanagement.component';
import { ContractawardComponent } from './views/contractaward/contractaward.component';
import { TesingComponent } from './tesing/tesing.component';
// import { BidmanagementComponent } from './bidmanagement/bidmanagement.component';
import { RegisterComponent } from './views/register/register.component';
import { Title } from 'chart.js';

const newLocal = './views/register/register.module';
// import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [

  { path:'', component:LoginComponent, data: { title: 'login'}},

  { path:'', component:TesingComponent, data: { title: 'tesingcomponent'}},
  

  { path: 'register', component:RegisterComponent, data: { title: 'Register'}},
  
  // {path:'', component:RegisterComponent,data: { title: "registerpage"}},
  // { path:'', component:RegisterComponent, data: { title: 'register1'}},

  // { path:'dashboard', component:DashboardComponent, data: { title: 'register'}},
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
     
    },
    children: [
      {
        // path: 'vendormanagement/:id',
        path: 'vendormanagement',
        loadChildren: () =>
          import('./views/vendormanagement/vendormanagement.module').then((m) => m.VendorModule)
      },
      {
        path: 'contractaward',
        loadChildren: () =>
          import('./views/contractaward/contractaward.module').then((m) => m.ContractawardModule)
      },
      {
        path: 'BidResponses', 
        loadChildren: () =>
          import('./views/bid-responses/bid-responses.module').then((m) => m.BidResponsesModule)
      },
      {
        path: 'ViewBid',
        loadChildren: () =>
          import('./views/View-Bid/View-Bid.module').then((m) => m.BidListModule)
      },
      // {
      //   path: 'empdashboard',
      //   loadChildren: () =>
      //     import('./views/emp-dashboard/emp-dashboard.module').then((m) => m.EmpdashboardModule)
      // },
      // {
      //   path: 'vendordashboard',
      //   loadChildren: () =>
      //     import('./views/vendor_dashboard/vendor-dashboard.module').then((m) => m.VendordashboardModule)
      // },
     {
        path: 'adminmanagement',
        loadChildren: () =>
          import('./views/adminmanagement/adminmanagement.module').then((m) => m.AdminModule)
      },
      {
        path: 'Logout',
        loadChildren: () =>
          import('./views/logout/logout.module').then((m) => m.LogoutModule)
      },
      {
        path: 'registertest',
        loadChildren: () =>
          import('./views/register/register.module').then((m) => m.RegisterModule)
      },
     
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
 
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'VendorList',
        loadChildren: () =>
          import('./views/vendor-list/vendor-list.module').then((m) => m.VendorListModule)
      },
  
      {
        path: 'BidResponses', 
        loadChildren: () =>
          import('./views/bid-responses/bid-responses.module').then((m) => m.BidResponsesModule)
      },
      {
        path: 'bidManagement',
        loadChildren: () =>
          import('./views/bid-management/bid-management.module').then((m) => m.BidmanagementModule)
      },
      {
        path: 'ViewBidresponses',
        loadChildren: () =>
          import('./views/view-bidresponses/view-bidresponses.module').then((m) => m.ViewBidresponsesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'admin',
    component: AdminmanagementComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  
  // {
  //   path: 'registrationform',
  //   component: RegistrationformComponent,
  //   data: {
  //     title: 'registrationform'
  //   }
  // },
  {
    path: 'testing',
    component: TesingComponent,
    data: {
      title: 'testing'
    }
  },
  // {
  //   path: 'bidmanagement',
  //   component: BidmanagementComponent,
  //   data: {
  //     title: 'bidmanagement'
  //   }
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  // {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
// import { navItems } from './_nav';
// import { navItems1 } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})

export class DefaultLayoutComponent implements OnInit{
  // usertypeses:any;
  // public navItems = navItems;
  // public navItems1 = navItems1;
  usertypeses = localStorage.getItem('usertypeses');

  navItems: INavData[] = [
 
    {
      name: 'User Management',
      url: '/VendorList',
      icon: 'fa fa-users'
     },
    {
      name: 'Vendor Management',
      url: '/vendormanagement',
       icon: 'fa fa-user-circle'
    },
    {
      name: 'Certification Management',
      url: '/buttons',
      icon: 'fa fa-files-o'
  
      // children: [
      //   {
      //     name: 'Certification Programs Offered',
      //     url: '/buttons/buttons',
      //     iconComponent: { name: 'cil-drop' }
      //   },
      //   {
      //     name: 'Certification Application Processing',
      //     url: '/buttons/button-groups',
      //     iconComponent: { name: 'cil-drop' }
      //   },
      //   {
      //     name: 'View Active Certificates',
      //     url: '/BidResponses',
      //     iconComponent: { name: 'cil-drop' }
      //   },
      //   {
      //     name: 'Certificate Expiration Notification',
      //     url: '/BidResponses'
      //   },
      // ]
    },
    {
      name: 'Bid Management',
      url: '/BidList',
      // iconComponent: { name: 'cil-balance-scale'},
      icon: 'fa fa-balance-scale',
      children: [
        {
          name: 'View Bids',
          url: '/BidList'
        },
        {
          name: 'Create/View Bid',
          url: '/adminmanagement'
        },
        {
          name: 'Bid Responses',
          url: '/BidResponses'
        },
        {
          name: 'Award Contract',
          url: '/adminmanagement'
        },
      ]
    },
    {
      name: 'Contract Management',
      url: '/adminmanagement',
      // iconComponent: { name: 'cil-drop' }
      icon: 'fa fa-handshake-o'
    },
    {
      name: 'Insurance Management',
      url: '/adminmanagement',
      // iconComponent: { name: 'cil-drop' }
      icon: 'fa fa-umbrella'
    },
    {
      name: 'HR Management',
      url: '/adminmanagement',
      // iconComponent: { name: 'cil-drop' }
      icon: 'fa fa-user-o'
    },
    {
      name: 'Interface',
      url: '/adminmanagement',
      // iconComponent: { name: 'cil-drop' }
      icon: 'fa fa-window-restore'
    },
    {
      name: 'Reports',
      url: '/adminmanagement',
      // iconComponent: { name: 'cil-drop' }
      icon: 'fa fa-line-chart'
    },
    
  ];

  navItems1: INavData[] = [
 
    {
      name: 'Vendor Management 2 tyreytry',
      url: '/',
      iconComponent: { name: 'cil-drop' }
    }
  // }
  ,
    {
      name: 'User Management 2 rtetrty',
      url: '/',
      // linkProps: { fragment: 'someAnchor' },
      iconComponent: { name: 'cil-pencil' }
    },

    
    
  ];

  // console.log(usertypeses);
  // if(this.usertypeses == "EMPLOY") {
  
  // }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}

  ngOnInit(): void {
    this.usertypeses = localStorage.getItem('usertypeses');
    
  }
}
function usertypeses(usertypeses: any) {
  throw new Error('Function not implemented.');
}


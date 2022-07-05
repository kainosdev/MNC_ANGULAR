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
      name: 'Vendor Management 1',
      url: '/vendormanagement',
      iconComponent: { name: 'cil-drop' }
    }
  // }
  ,
    {
      name: 'User Management',
      url: '/adminmanagement',
      // linkProps: { fragment: 'someAnchor' },
      iconComponent: { name: 'cil-pencil' }
    },
    
  ];

  // navItems1: INavData[] = [
 
  //   {
  //     name: 'Vendor Management 2',
  //     url: '/vendormanagement',
  //     iconComponent: { name: 'cil-drop' }
  //   }
  // // }
  // ,
  //   {
  //     name: 'User Management 2',
  //     url: '/adminmanagement',
  //     // linkProps: { fragment: 'someAnchor' },
  //     iconComponent: { name: 'cil-pencil' }
  //   },
    
  // ];
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


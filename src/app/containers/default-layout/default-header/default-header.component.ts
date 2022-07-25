import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router,ActivatedRoute,ParamMap, Params } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent  {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  firstname:any;
  lastname:any;
  middlename:any;
  constructor(private classToggler: ClassToggleService,private  router:  Router) {
    super();
    this.firstname = localStorage.getItem('Firstnameses');
    this.lastname = localStorage.getItem('LastNameses');
    this.middlename = localStorage.getItem('Middlenameses');
  }

  logout(){
    // alert("in")
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}

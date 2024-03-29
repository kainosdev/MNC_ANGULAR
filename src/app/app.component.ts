import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
// import { RestAPIService } from ".../shared/rest-api.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Vertex Management';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    // public restApi: RestAPIService,
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    if(localStorage.getItem('Firstnameses') == null){
      window.localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}

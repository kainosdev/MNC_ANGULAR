import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';

import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-adminmanagement',
  templateUrl: './adminmanagement.component.html',
  styleUrls: ['./adminmanagement.component.scss']
})

export class AdminmanagementComponent implements OnInit, OnDestroy {
//   public data = [
//     {contactno: '678909', title: 'CRM HOSPITAL'},
//     {contactno: '789000', title: 'apollo'},
//     {contactno: '678990', title: 'sims'},
//     {contactno: '678990', title: 'srm'},
// ];
// title = 'datatables';
// dtOptions: DataTables.Settings = {};
    
min: any = 0;
max: any = 0;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  title = 'datatables';
  // posts;

  constructor(private http: HttpClient) { }
 
  ngOnInit(): void {
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
    };

    // $.fn.dataTable.ext.search.push((settings: any, data: string[], dataIndex: any) => {
    //   const id = parseFloat(data[0]) || 0; // use data for the id column
    //   return (Number.isNaN(this.min) && Number.isNaN(this.max)) ||
    //       (Number.isNaN(this.min) && id <= this.max) ||
    //       (this.min <= id && Number.isNaN(this.max)) ||
    //       (this.min <= id && id <= this.max);
    // });
  
    // this.http.get('http://jsonplaceholder.typicode.com/posts')
    //   .subscribe(posts => {
    //     this.posts = posts;
    // });
  
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  filterById(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  @ViewChild(DataTableDirective, {static: false})
datatableElement: any = DataTableDirective;
}

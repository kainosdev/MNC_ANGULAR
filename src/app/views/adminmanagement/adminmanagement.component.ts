import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
// import 'datatables.net'


@Component({
  selector: 'app-adminmanagement',
  templateUrl: './adminmanagement.component.html',
  styleUrls: ['./adminmanagement.component.scss']
})



export class AdminmanagementComponent implements OnInit {
//   public data = [
//     {contactno: '678909', title: 'CRM HOSPITAL'},
//     {contactno: '789000', title: 'apollo'},
//     {contactno: '678990', title: 'sims'},
//     {contactno: '678990', title: 'srm'},
// ];
// title = 'datatables';
// dtOptions: DataTables.Settings = {};
    
min: any;
max: any;
posts: any; 
dtOptions: any = {};

  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  title = 'datatables';
  // posts;

  

  constructor(private http: HttpClient, private D :DataTablesModule  ) { }
 
  ngOnInit(): void {
    // this.dtOptions = {
    //   // Declare the use of the extension in the dom parameter
    //   dom: 'Bfrtip',
    // };

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

    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      order:[],
      
      buttons: {
        dom: {
          button: {
            tag: 'i',
            className: ''
          }
        },
        //since we now have completely unstyled icons add
        //some space between them trough a .custom-btn class
        buttons: [
         {
           titleAttr: 'Download as PDF',
           extend: 'pdfHtml5',
           className: 'custom-btn fa fa-file-pdf-o ',
           text: ''
         },
         {
           titleAttr: 'Download as Excel',
           extend: 'excelHtml5',
           className: 'custom-btn fa fa-file-excel-o',
           text: '',
          //  exportOptions: {
          //   columns: [ 0, 1, 3, 4, 5, 6],
            // 'columnDefs': [ {
              //'targets': [1,2], /* column index */
            //  'orderable': false, /* true or false */
          //  }]
      //  }
         },
         {
           titleAttr: 'Download as CSV',
           extend: 'csvHtml5',
           className: 'custom-btn fa fa-file-text-o',
           text: ''
         },
         {
           titleAttr: 'Print',
           extend: 'print',
           className: 'custom-btn fa fa-print',
           text: ''
         },

        ],
        // select: true,
      }

    };
  
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}



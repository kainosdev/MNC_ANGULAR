import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesing',
  templateUrl: './tesing.component.html',
  styleUrls: ['./tesing.component.scss']
})
export class TesingComponent implements OnInit {
  dtOptions: any = {};
  title = 'datatables';

  posts:any;

  constructor() { }

  ngOnInit(): void {
  

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

}
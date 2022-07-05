import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminmanagement',
  templateUrl: './adminmanagement.component.html',
  styleUrls: ['./adminmanagement.component.scss']
})
export class AdminmanagementComponent implements OnInit {
  public data = [
    {contactno: '678909', title: 'CRM HOSPITAL'},
    {contactno: '789000', title: 'apollo'},
    {contactno: '678990', title: 'sims'},
    {contactno: '678990', title: 'srm'},
];

  dtOptions: DataTables.Settings = {};
  title = 'angulardatatables';
 
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
        
    };
}
}
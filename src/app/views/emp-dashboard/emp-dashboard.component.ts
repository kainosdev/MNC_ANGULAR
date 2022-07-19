import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent implements OnInit {
  //bid_form: FormGroup | any;
  //clinform:FormGroup | any;
  submitted = false;
  bid_form_show=true;
  clin_submitted=false;
  bidstatus:any;
  contractVehicle:any;
  aside_type_list:any;
  opportunity_type_list:any;
  contract_officer_list:any;
  service_type_list:any;
  dbe_list:any;
  stepname="Details"
  a="1";
  b="2";
  c="3";
  collapsing = true;

  dtOptions: DataTables.Settings = {};
  title = 'datatables';

  constructor() { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup(){
    this.displayStyle = "none";
  }

}

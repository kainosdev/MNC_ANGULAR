import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config_url } from '../shared/constant';

@Component({
  selector: 'emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent implements OnInit {
  
  Bidslist:any;
  awarduserlist:any;
  Vendorlist:any;
  Title:any;
  SolicitationTypeId: any;
  BidStatusId: any;
  DepartmentId:any;
  UpdatedDate:any;
  BidResponseDueDate:any;
  collapsing = true;

  dtOptions: DataTables.Settings = {};
  title = 'datatables';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {




    

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.awarduser();
    this.vendor();
    this.bids();
   

  }
  
   
  vendor(){
    try
    {
      this.http.get(config_url+'bid/GetBidOpenandDraft?BidStatusId=A').subscribe(
        (data: any) => {
          var response= data.BidOpen;
          this.Vendorlist = response;
           // console.log(this.bidstatus)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }

  bids(){
    try
    {
      this.http.get(config_url+'bid/GetBidOpenandDraft?BidStatusId=O').subscribe(
        (data: any) => {
          var response= data.BidOpen;
          this.Bidslist = response;
           // console.log(this.bidstatus)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }

  awarduser(){
    try
    {
      this.http.get(config_url+'bid/GetConAwardByUser?CurrentUserid=1').subscribe(
        (data: any) => {
          var response= data.currentuserid;
          this.awarduserlist = response;
           // console.log(this.bidstatus)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup(){
    this.displayStyle = "none";
  }

}

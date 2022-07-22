import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config_url } from '../shared/constant';

@Component({
  selector: 'vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  
  Bidslist:any;
  vendoractivelist:any;
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
  BidsSubmittedlist: any;
  ResponseNotSubmittedlist: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {




    

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.vendoractive();
    this.ResponseSubmitted();
    this.ResponseNotSubmitted();
   

  }
  
   
  vendoractive(){
    try
    {
      this.http.get(config_url+'contract/GetVendorActiveContracts?VendorId=34343434').subscribe(
        (data: any) => {
          var response= data.VendorActiveContracts;
          this.vendoractivelist = response;
           // console.log(this.bidstatus)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }

  ResponseSubmitted(){
    try
    {
      this.http.get(config_url+'bid/GetBidResponseSubmittedByVendor?VendorId=34343434').subscribe(
        (data: any) => {
          var response= data.BidResponseSubmitted;
          this.BidsSubmittedlist = response;
           // console.log(this.bidstatus)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }

  ResponseNotSubmitted(){
    try
    {
      this.http.get(config_url+'bid/GetBidResponseNotSubmittedByVendor?VendorId=34343434').subscribe(
        (data: any) => {
          var response= data.BidResponseNotSubmitted;
          this.ResponseNotSubmittedlist = response;
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

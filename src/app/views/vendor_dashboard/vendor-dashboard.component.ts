import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config_url } from '../shared/constant';
//import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

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
  BidsSubmittedlist: any;
  ResponseNotSubmittedlist: any;

/*
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<void>();*/
  
  
  // dtOptions: DataTables.Settings = {};
  // title = 'datatables';
  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.vendoractive();
    this.ResponseSubmitted();
    this.ResponseNotSubmitted();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
    
  }
  
  vendoractive(){
    try
    {
      this.http.get(config_url+'contract/GetVendorActiveContracts?VendorId=34343434').subscribe(
        (data: any) => {
          var response= data.VendorActiveContracts;
          debugger;
           // console.log(this.bidstatus)
           for (let i = 0; i < response.length; i++) {
            response[i].StartDatePlanned = response[i].StartDatePlanned.split(' ')[0];
            response[i].EndDatePlanned = response[i].EndDatePlanned.split(' ')[0];
            response[i].ActualStartDate = response[i].ActualStartDate.split(' ')[0];
            response[i].ActualEndDate = response[i].ActualEndDate.split(' ')[0];
           }
           this.vendoractivelist = response;
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
          debugger;
           // console.log(this.bidstatus)
           for (let i = 0; i < response.length; i++) {
            response[i].BidResponseDueDate = response[i].BidResponseDueDate.split(' ')[0];
            response[i].BidPostedDate = response[i].BidPostedDate.split(' ')[0];
           }
           this.BidsSubmittedlist = response;
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
          debugger;
           // console.log(this.bidstatus)
           for (let i = 0; i < response.length; i++) {
            response[i].BidPostedDate = response[i].BidPostedDate.split(' ')[0];
            response[i].BidResponseDueDate = response[i].BidResponseDueDate.split(' ')[0];
            // console.log(this.posteddate);
            // console.log(this.duedate);
        }
        this.ResponseNotSubmittedlist = response;
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

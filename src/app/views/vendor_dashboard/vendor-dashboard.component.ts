import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config_url } from '../shared/constant';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})



export class VendorDashboardComponent implements OnInit {
  firstname:any;

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

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtOptions3: DataTables.Settings = {};


  dtTrigger: Subject<any> = new Subject<void>();



  legalname: string | null;
  Firstname: string | null;
  LastName: string | null;
  lastname: string | null;
  middlename: string | null;
  UserId: string | null;


  // dtOptions: DataTables.Settings = {};
  // title = 'datatables';
  //dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient) { }
    ngAfterViewInit(): void {


    //  this.dtTrigger.next(this.vendoractivelist);
     // this.dtTrigger.next(this.BidsSubmittedlist);
      //this.dtTrigger.next(this.ResponseNotSubmittedlist);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        scrollX: true,
        destroy:true,
      };
      this.dtOptions1 = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        scrollX: true,
        destroy:true,
      };
      this.dtOptions2 = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        scrollX: true,
        destroy:true,
      };
      this.dtOptions3 = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        scrollX: true,
        destroy:true,
      };



    }

  ngOnInit(): void {

    this.vendoractive();
    this.ResponseSubmitted();
    this.ResponseNotSubmitted();


    this.firstname = localStorage.getItem('Firstnameses');
    this.lastname = localStorage.getItem('LastNameses');
    this.middlename = localStorage.getItem('Middlenameses');
    this.UserId=localStorage.getItem('CreatedUseridses');
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
  this.dtTrigger.next(this.vendoractivelist);
  this.dtTrigger.next(this.BidsSubmittedlist);
  this.dtTrigger.next(this.ResponseNotSubmittedlist);


      // this.dtTrigger.next(this.Bidslist);
    });
  }

  // rerender(): void {
  //   this.dtElement.forEach((dtElement: DataTableDirective) => {
  //     if(dtElement.dtInstance)
  //       dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //         dtInstance.destroy();
  //     });
  //   });


  // }


  // ngOnDestroy(): void {
  //   this.dtTrigger.unsubscribe();
  // }


  vendoractive(){

    try
    {
     // this.firstname = localStorage.getItem('Firstnameses');
      this.http.get(config_url+'contract/GetVendorActiveContracts?VendorId='+localStorage.getItem('CreatedUseridses')).subscribe(
        (data: any) => {
          var response= data.VendorActiveContracts;
          this.vendoractivelist = response;
          // debugger;
           // console.log(this.bidstatus)
           for (let i = 0; i < response.length; i++) {
            response[i].StartDatePlanned = response[i].StartDatePlanned.split(' ')[0];
            response[i].EndDatePlanned = response[i].EndDatePlanned.split(' ')[0];
            response[i].ActualStartDate = response[i].ActualStartDate.split(' ')[0];
            response[i].ActualEndDate = response[i].ActualEndDate.split(' ')[0];

          }
          this.dtTrigger.next(this.vendoractivelist);

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
      this.http.get(config_url+'bid/GetBidResponseSubmittedByVendor?VendorId='+localStorage.getItem('CreatedUseridses')).subscribe(
        (data: any) => {
          var response= data.BidResponseSubmitted;
          // debugger;
           // console.log(this.bidstatus)
           for (let i = 0; i < response.length; i++) {
            response[i].BidResponseDueDate = response[i].BidResponseDueDate.split(' ')[0];
            response[i].BidPostedDate = response[i].BidPostedDate.split(' ')[0];
           }
           this.BidsSubmittedlist = response;
          //  this.dtTrigger1.next(this.BidsSubmittedlist);
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
      this.http.get(config_url+'bid/GetBidResponseNotSubmittedByVendor?VendorId='+localStorage.getItem('CreatedUseridses')).subscribe(
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
      //  this.dtTrigger2.next(this.ResponseNotSubmittedlist);
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



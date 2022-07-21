import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config_url } from '../shared/constant';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


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
  BidDraftList: any;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  posteddate: any;
  duedate: any;
  postedDateDraft: any;
  dueDateDraft: any;
  startDatePlanned: any;
  endDatePlanned: any;
  startDateActual: any;
  endDateActual: any;
  directReportDetail: any;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void{
  //   this.Bidslist=[];
  // this.BidDraftList=[];

    this.dtTrigger.next(this.Bidslist);
    this.dtTrigger.next(this.BidDraftList);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,

    };


  }

  ngOnInit(): void {
// this.Bidslist=[];
// this.BidDraftList=[];

this.vendor();
this.bidsDraft();
this.bidsOpen();
this.awarduser();
this.directReport();


    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };




  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      // this.dtTrigger.next(this.Bidslist);
      // this.dtTrigger.next(this.BidDraftList);

      // this.dtTrigger.next(this.Bidslist);

    });
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

  bidsDraft(){
    try
    {
      this.http.get(config_url+'bid/GetBidOpenandDraft?BidStatusId=D').subscribe(
        (data: any) => {
          // console.log("biddrafts",data);
          var response= data.BidOpen;
          this.BidDraftList = response;
        //    console.log(this.Bidslist)
           this.dtTrigger.next(this.BidDraftList);
           for (let i = 0; i < this.BidDraftList.length; i++) {
            this.postedDateDraft = this.BidDraftList[i].BidPostedDate.split(' ')[0];
            this.dueDateDraft = this.BidDraftList[i].BidResponseDueDate.split(' ')[0];
            // console.log(this.posteddate);
            // console.log(this.duedate);
        }

        });
    }
    catch(e)
    {
      console.log(e);
    }

  }

  bidsOpen(){
    try
    {
      this.http.get(config_url+'bid/GetBidOpenandDraft?BidStatusId=O').subscribe(
        (data: any) => {
          var response= data.BidOpen;
          this.Bidslist = response;
          //  console.log(this.Bidslist)
          //  this.dtTrigger.next(this.Bidslist);
           for (let i = 0; i < this.Bidslist.length; i++) {
            this.posteddate = this.Bidslist[i].BidPostedDate.split(' ')[0];
            this.duedate = this.Bidslist[i].BidResponseDueDate.split(' ')[0];
            // console.log(this.posteddate);
            // console.log(this.duedate);
        }

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
      this.http.get(config_url+'bid/GetConAwardByUser?CurrentUserid=CA01').subscribe(
        (data: any) => {
          console.log("data1",data);
          var response= data.currentuserid;
          this.awarduserlist = response;
          for (let i = 0; i < this.awarduserlist.length; i++) {
            this.startDatePlanned = this.awarduserlist[i].StartDatePlanned.split(' ')[0];
            this.endDatePlanned = this.awarduserlist[i].EndDatePlanned.split(' ')[0];
            this.startDateActual = this.awarduserlist[i].StartDateActual.split(' ')[0];
            this.endDateActual = this.awarduserlist[i].EndDateActual.split(' ')[0];
            // console.log(this.posteddate);
            // console.log(this.duedate);
        }
           // console.log(this.bidstatus)
        });
    }
    catch(e)
    {
      console.log(e);
    }

  }
  directReport(){
    try
    {
      this.http.get(config_url+'employee/GetDirectReport?EmployeeId_Supervisor=4956ea2b-a56a-45f8-996c-0f2c7d3f3e46').subscribe(
        (data: any) => {
          // console.log("data2",data);
          var response= data.DirectReport;
          this.directReportDetail = response;
          console.log(this.directReportDetail);
        //   for (let i = 0; i < this.awarduserlist.length; i++) {
        //     this.startDatePlanned = this.awarduserlist[i].StartDatePlanned.split(' ')[0];
        //     this.endDatePlanned = this.awarduserlist[i].EndDatePlanned.split(' ')[0];
        //     this.startDateActual = this.awarduserlist[i].StartDateActual.split(' ')[0];
        //     this.endDateActual = this.awarduserlist[i].EndDateActual.split(' ')[0];
        //     // console.log(this.posteddate);
        //     // console.log(this.duedate);
        // }
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

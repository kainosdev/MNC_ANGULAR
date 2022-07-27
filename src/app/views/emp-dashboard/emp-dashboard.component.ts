import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config_url } from '../shared/constant';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss'],
})
export class EmpDashboardComponent implements OnInit {
  Bidslist: any;
  awarduserlist: any;
  Vendorlist: any;
  Title: any;
  SolicitationTypeId: any;
  BidStatusId: any;
  DepartmentId: any;
  UpdatedDate: any;
  BidResponseDueDate: any;
  collapsing = true;
  BidDraftList: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | any;

  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtOptions3: DataTables.Settings = {};
  dtOptions4: DataTables.Settings = {};
  dtOptions5: DataTables.Settings = {};


  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger3: Subject<any> = new Subject();
  dtTrigger4: Subject<any> = new Subject();
  dtTrigger5: Subject<any> = new Subject();



  // posteddate: string = new Date().toDateString();
  // duedate: string = new Date().toDateString();
  // postedDateDraft: string = new Date().toDateString();
  // dueDateDraft: string = new Date().toDateString();
  // startDatePlanned: string = new Date().toDateString();
  // endDatePlanned: string = new Date().toDateString();
  // startDateActual: string = new Date().toDateString();
  // endDateActual: string = new Date().toDateString();
  directReportDetail: any;
  usertypedata: any;
  // employeeStartDate: string = new Date().toDateString();
  // employeeEndDate: string = new Date().toDateString();
  approvalEmployeeDetail: any;
  approvalVendorDetail: any;
  // employeeApprovalStartDate: string = new Date().toDateString();
  // employeeApprovalCreatedDate: string = new Date().toDateString();
  // vendorApprovalCreatedDate: string = new Date().toDateString();
  firstname: string | null;
  lastname: string | null;
  middlename: string | null;
  UserId : string | null;

  constructor(private http: HttpClient) {}



  ngOnInit(): void {


    this.bidsDraft();
    this.bidsOpen();
    this.awarduser();
    this.directReport();
    this.employeeapproval();
    this.vendorapproval();

    this.firstname = localStorage.getItem('Firstnameses');
    this.lastname = localStorage.getItem('LastNameses');
    this.middlename = localStorage.getItem('Middlenameses');
    this.UserId=localStorage.getItem('CreatedUseridses');

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      scrollX: true,
      deferRender: true,
      destroy:true
    };
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      scrollX: true,
      deferRender: true,
      destroy:true
    };
    this.dtOptions2 = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      scrollX: true,
      deferRender: true,
      destroy:true
    };
    this.dtOptions3 = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      scrollX: true,
      deferRender: true,
      destroy:true
    };
    this.dtOptions4 = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      scrollX: true,
      deferRender: true,
      destroy:true
    };
    this.dtOptions5 = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      scrollX: true,
      deferRender: true,
      destroy:true
    };
    this.rerender();
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.directReportDetail);
      this.dtTrigger1.next(this.approvalEmployeeDetail);
      this.dtTrigger2.next(this.approvalVendorDetail);
      this.dtTrigger3.next(this.BidDraftList);
      this.dtTrigger4.next(this.Bidslist);
      this.dtTrigger5.next(this.awarduserlist);
    });
  }



  bidsDraft() {
    try {
      this.http
        .get(config_url + 'bid/GetBidOpenandDraft?BidStatusId=D')
        .subscribe((data: any) => {

          var response = data.BidOpen;
          this.BidDraftList = response;

          // for (let i = 0; i < this.BidDraftList.length; i++) {
          //   this.BidDraftList[i].postedDateDraft =
          //     this.BidDraftList[i].BidPostedDate?.split(' ')[0];
          //     this.BidDraftList[i].dueDateDraft =
          //     this.BidDraftList[i].BidResponseDueDate?.split(' ')[0];

          // }

      this.dtTrigger3.next(this.BidDraftList);

        });
    } catch (e) {
      console.log(e);
    }
  }

  bidsOpen() {
    try {
      this.http
        .get(config_url + 'bid/GetBidOpenandDraft?BidStatusId=O')
        .subscribe((data: any) => {
          var response = data.BidOpen;
          this.Bidslist = response;


          // for (let i = 0; i < this.Bidslist.length; i++) {
          //   this.Bidslist[i].posteddate = this.Bidslist[i].BidPostedDate?.split(' ')[0];
          //   this.Bidslist[i].duedate = this.Bidslist[i].BidResponseDueDate?.split(' ')[0];

          // }

      this.dtTrigger4.next(this.Bidslist);

        });
    } catch (e) {
      console.log(e);
    }
  }

  awarduser() {
    try {
      this.http
        .get(config_url + 'bid/GetConAwardByUser?CurrentUserid='+localStorage.getItem('CreatedUseridses'))
        .subscribe((data: any) => {

          var response = data.currentuserid;
          this.awarduserlist = response;
          // for (let i = 0; i < this.awarduserlist.length; i++) {
          //   this.awarduserlist[i].startDatePlanned =
          //     this.awarduserlist[i].StartDatePlanned?.split(' ')[0];
          //     this.awarduserlist[i].endDatePlanned =
          //     this.awarduserlist[i].EndDatePlanned?.split(' ')[0];
          //     this.awarduserlist[i].startDateActual =
          //     this.awarduserlist[i].StartDateActual?.split(' ')[0];
          //     this.awarduserlist[i].endDateActual =
          //     this.awarduserlist[i].EndDateActual?.split(' ')[0];

          // }

      this.dtTrigger5.next(this.awarduserlist);
        });
    } catch (e) {
      console.log(e);
    }
  }
  directReport() {
    try {
      this.http
        .get(
          config_url +
            'employee/GetDirectReport?EmployeeIdSupervisor='+localStorage.getItem('CreatedUseridses')
        )
        .subscribe((data: any) => {

          var response = data.DirectReport;
          this.directReportDetail = response;



          // for (let i = 0; i < this.directReportDetail.length; i++) {
          //   console.log(this.directReportDetail[i].StartDate);
          //   this.directReportDetail[i].employeeStartDate =
          //     this.directReportDetail[i].StartDate?.split(' ')[0];
          //   this.directReportDetail[i].employeeEndDate =
          //     this.directReportDetail[i].EndDate?.split(' ')[0];
          // }
          this.dtTrigger.next(this.directReportDetail);

        });
    } catch (e) {
      console.log(e);
    }
  }
  employeeapproval() {
    this.http
      .get(
        config_url +
          'employee/GetEmployeeApproval?UserTypeId=EMPLOY&UserStatusId=N'
      )
      .subscribe((data: any) => {

        var response = data.GetApprovalForEmployee;
        this.approvalEmployeeDetail = response;
        // for (let i = 0; i < this.approvalEmployeeDetail.length; i++) {
        //   this.approvalEmployeeDetail[i].employeeApprovalStartDate =
        //     this.approvalEmployeeDetail[i].StartDate?.split(' ')[0];
        //     this.approvalEmployeeDetail[i].employeeApprovalCreatedDate =
        //     this.approvalEmployeeDetail[i].CreatedDate?.split(' ')[0];

        // }

      this.dtTrigger1.next(this.approvalEmployeeDetail);


      });
  }
  vendorapproval() {
    this.http
      .get(
        config_url + 'vendor/GetVendorApproval?UserTypeId1=EMPLOY&UserStatusId=N'
      )
      .subscribe((data: any) => {
        // console.log("VENDOR", data);
        var response = data.GetVendorApproval;
        this.approvalVendorDetail = response;
        for(let i=0;i<this.approvalVendorDetail.length;i++){
          this.approvalVendorDetail[i].VendorType=this.approvalVendorDetail[i].VendorTypeDesc?.replace('Vendor -','');

                  }
        this.dtTrigger2.next(this.approvalVendorDetail);
      });
  }
  VendorType(VendorType: any) {
    throw new Error('Method not implemented.');
  }
  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }
}

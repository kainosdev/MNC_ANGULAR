import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { config_url } from '../shared/constant';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss'],
})
export class EmpDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'UserName',
    'FirstName',
    'LastName',
    'MiddleName',
    'Phone',
    'Email',
    'EmploymentType',
    'JobTitle',
    'StartDate',
    'EndDate',
  ];
  displayedColumns1: string[] = [
    'UserName',
    'FirstName',
    'LastName',
    'MiddleName',
    'UserStatus',
    'Approve',
    'Phone',
    'Email',
    'EmploymentType',
    'JobTitle',
    'StartDate',
    'CreatedDate',
    'CreatedUserId',
  ];
  displayedColumns2: string[] = [
    'UserName',
    'VendorName',
    'VendorType',
    'UserStatus',
    'Approve',
    'Phone',
    'Email',
    'CreatedDate',
    'CreatedUserId',
  ];

  displayedColumns3: string[] = [
    'BidNumber',
    'Title',
    'Status',
    'Department',
    'PostedDate',
    'ResponseDueDate',
  ];

  displayedColumns4: string[] = [
    'BidNumber',
    'Title',
    'Status',
    'Department',
    'PostedDate',
    'ResponseDueDate',
  ];

  displayedColumns5: string[] = [
    'ContractNumber',
    'Title',
    'ContractStatus',
    'Department',
    'AwardedDate',
    'PlannedStartDate',
    'PlannedEndDate',
    'ActualStartDate',
    'ActualEndDate',
    'ContractingOfficer',
    'TechnicalMonitorName',
    'Baseyears',
    'Optionyears'
  ];

  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  dataSource3 = new MatTableDataSource();
  dataSource4 = new MatTableDataSource();
  dataSource5 = new MatTableDataSource();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;


  @ViewChild('sort') sort = new MatSort();
  @ViewChild('sort1') sort1 = new MatSort();
  @ViewChild('sort2') sort2 = new MatSort();
  @ViewChild('sort3') sort3 = new MatSort();
  @ViewChild('sort4') sort4 = new MatSort();
  @ViewChild('sort5') sort5 = new MatSort();

  directReportDetail: any;
  approvalEmployeeDetail: any;
  approvalVendorDetail: any;
  BidDraftList: any;
  Bidslist: any;
  awarduserlist: any;

  lastname: string | null;
  firstname: string | null;
  middlename: string | null;
  UserId: string | null;
  collapsing = true;

  displayNoRecords: boolean;
  displayNoRecords1: boolean;
  displayNoRecords2: boolean;
  displayNoRecords3: boolean;
  displayNoRecords4: boolean;
  displayNoRecords5: boolean;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource3.paginator = this.paginator3;
    this.dataSource4.paginator = this.paginator4;
    this.dataSource5.paginator = this.paginator5;

    this.dataSource.sort = this.sort;
    this.dataSource1.sort = this.sort1;
    this.dataSource2.sort = this.sort2;
    this.dataSource3.sort = this.sort3;
    this.dataSource4.sort = this.sort4;
    this.dataSource5.sort = this.sort5;


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filter = filterValue;
    if (this.dataSource.filteredData.length == 0) {
      this.displayNoRecords = true;
    } else {
      this.displayNoRecords = false;
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
    this.dataSource1.filter = filterValue;
    if (this.dataSource1.filteredData.length == 0) {
      this.displayNoRecords1 = true;
    } else {
      this.displayNoRecords1 = false;
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
    this.dataSource2.filter = filterValue;
    if (this.dataSource2.filteredData.length == 0) {
      this.displayNoRecords2 = true;
    } else {
      this.displayNoRecords2 = false;
    }
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
    this.dataSource3.filter = filterValue;
    if (this.dataSource3.filteredData.length == 0) {
      this.displayNoRecords3 = true;
    } else {
      this.displayNoRecords3 = false;
    }
  }

  applyFilter4(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource4.filter = filterValue.trim().toLowerCase();
    if (this.dataSource4.paginator) {
      this.dataSource4.paginator.firstPage();
    }
    this.dataSource4.filter = filterValue;
    if (this.dataSource4.filteredData.length == 0) {
      this.displayNoRecords4 = true;
    } else {
      this.displayNoRecords4 = false;
    }
  }

  applyFilter5(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource5.filter = filterValue.trim().toLowerCase();
    if (this.dataSource4.paginator) {
      this.dataSource4.paginator.firstPage();
    }
    this.dataSource5.filter = filterValue;
    if (this.dataSource5.filteredData.length == 0) {
      this.displayNoRecords5 = true;
    } else {
      this.displayNoRecords5 = false;
    }
  }

  ngOnInit(): void {
    this.directReport();
    this.employeeapproval();
    this.vendorapproval();
    this.bidsDraft();
    this.bidsOpen();
    this.awarduser();

    this.firstname = localStorage.getItem('Firstnameses');
    this.lastname = localStorage.getItem('LastNameses');
    this.middlename = localStorage.getItem('Middlenameses');
    this.UserId = localStorage.getItem('CreatedUseridses');
  }

  constructor(private http: HttpClient) {}

  Updateemplyeestatus(event: any, post: any){
    try {
      console.log(post);
      this.http
        .get(
          config_url +
           'employee/Updateemplyeestatus?Id='+post.CreatedUserId+'&UserStatusId=N&UpdatedUserId='+localStorage.getItem('CreatedUseridses')
          // 'employee/Updateemplyeestatus?Id='+localStorage.getItem('CreatedUseridses')+'&UserStatusId=A&UpdatedUserId='+post.CreatedUserId
        )
        .subscribe((data: any) => {
        console.log(data)
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
            'employee/GetDirectReport?EmployeeIdSupervisor=' +
            localStorage.getItem('CreatedUseridses')
        )
        .subscribe((data: any) => {
          // console.log(data);
          var response = data.DirectReport;
          this.directReportDetail = response;
          this.dataSource.data = response;
        });
    } catch (e) {
      console.log(e);
    }
  }

  employeeapproval() {
    try {
      this.http
        .get(
          config_url +
            'employee/GetEmployeeApproval?UserTypeId=EMPLOY&UserStatusId=N'
        )
        .subscribe((data: any) => {
          // console.log(data)
          var response = data.GetApprovalForEmployee;
          this.approvalEmployeeDetail = response;
          this.dataSource1.data = response;
        });
    } catch (e) {
      console.log(e);
    }
  }

  vendorapproval() {
    try {
      this.http
        .get(
          config_url +
            'vendor/GetVendorApproval?UserTypeId1=EMPLOY&UserStatusId=N'
        )
        .subscribe((data: any) => {
          console.log('VENDOR', data);
          var response = data.GetVendorApproval;
          this.approvalVendorDetail = response;
          this.dataSource2.data = response;
          for (let i = 0; i < this.approvalVendorDetail.length; i++) {
            this.approvalVendorDetail[i].VendorType = this.approvalVendorDetail[
              i
            ].VendorTypeDesc?.replace('Vendor -', '');
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  bidsDraft() {
    try {
      this.http
        .get(config_url + 'bid/GetBidOpenandDraft?BidStatusId=D')
        .subscribe((data: any) => {
          var response = data.BidOpen;
          this.BidDraftList = response;
          this.dataSource3.data = response;
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
          this.dataSource4.data = response;
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
          this.dataSource5.data = response;

        });
    } catch (e) {
      console.log(e);
    }
  }

}

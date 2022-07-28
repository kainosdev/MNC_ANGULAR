import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { config_url } from '../shared/constant';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss'],
})
export class EmpDashboardComponent implements OnInit {
  displayedColumns: string[] = ['UserName', 'FirstName', 'LastName', 'MiddleName', 'Phone',
   'Email', 'EmploymentType', 'JobTitle', 'StartDate', 'EndDate'];
   displayedColumns1: string[] = ['UserName', 'FirstName', 'LastName', 'MiddleName','UserStatus',
   'Approve', 'Phone',
   'Email', 'EmploymentType', 'JobTitle', 'StartDate', 'CreatedDate', 'CreatedUserId'];
   displayedColumns2: string[] = ['UserName', 'VendorName', 'VendorType', 'UserStatus',
   'Approve', 'Phone',
   'Email', 'CreatedDate', 'CreatedUserId'];
   displayedColumns3: string[] = ['BidNumber', 'Title', 'Status', 'Department',
   'PostedDate', 'Response Due Date'];

  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  dataSource3 = new MatTableDataSource();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;



  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatSort) sort3: MatSort;


  directReportDetail:any;
  approvalEmployeeDetail: any;
  approvalVendorDetail: any;

  lastname: string | null;
  firstname: string | null;
  middlename: string | null;
  UserId: string | null;
  collapsing = true;

  displayNoRecords: boolean;
  displayNoRecords1: boolean;
  displayNoRecords2: boolean;
  displayNoRecords3: boolean;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource3.paginator = this.paginator3;




    this.dataSource.sort = this.sort;
    this.dataSource1.sort = this.sort1;
    this.dataSource2.sort = this.sort2;
    this.dataSource3.sort = this.sort3;


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filter = filterValue;
 if(this.dataSource.filteredData.length==0){
   this.displayNoRecords=true;
 }else{
   this.displayNoRecords=false;
 }
}

applyFilter1(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource1.filter = filterValue.trim().toLowerCase();
  if (this.dataSource1.paginator) {
    this.dataSource1.paginator.firstPage();
  }
  this.dataSource1.filter = filterValue;
if(this.dataSource1.filteredData.length==0){
 this.displayNoRecords1=true;
}else{
 this.displayNoRecords1=false;
}
}

applyFilter2(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource2.filter = filterValue.trim().toLowerCase();
  if (this.dataSource2.paginator) {
    this.dataSource2.paginator.firstPage();
  }
  this.dataSource2.filter = filterValue;
if(this.dataSource2.filteredData.length==0){
 this.displayNoRecords2=true;
}else{
 this.displayNoRecords2=false;
}
}

  ngOnInit(): void {
    this.directReport();
    this.employeeapproval();
    this.vendorapproval();


    this.firstname = localStorage.getItem('Firstnameses');
    this.lastname = localStorage.getItem('LastNameses');
    this.middlename = localStorage.getItem('Middlenameses');
    this.UserId=localStorage.getItem('CreatedUseridses');
  }

  constructor(private http: HttpClient) {
   this. dataSource = new MatTableDataSource();
    this.dataSource1 = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();

  }

    directReport() {
      try {
        this.http.get(
            config_url +
              'employee/GetDirectReport?EmployeeIdSupervisor='+localStorage.getItem('CreatedUseridses')
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
      }catch (e) {
        console.log(e);
      }
    }

    vendorapproval() {
      try{
      this.http
        .get(
          config_url + 'vendor/GetVendorApproval?UserTypeId1=EMPLOY&UserStatusId=N'
        )
        .subscribe((data: any) => {

          console.log("VENDOR", data);
          var response = data.GetVendorApproval;
          this.approvalVendorDetail = response;
          this.dataSource2.data = response;
          for(let i=0;i<this.approvalVendorDetail.length;i++){
            this.approvalVendorDetail[i].VendorType=this.approvalVendorDetail[i].VendorTypeDesc?.replace('Vendor -','');


                    }

        });
      }catch (e) {
        console.log(e);
      }
    }


  }

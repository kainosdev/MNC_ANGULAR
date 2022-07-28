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
export class EmpDashboardComponent  {
  displayedColumns: string[] = ['UserName', 'FirstName', 'LastName', 'MiddleName', 'Phone',
   'Email', 'EmploymentType', 'JobTitle', 'StartDate', 'EndDate'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  directReportDetail:any;
  lastname: string | null;
  firstname: string | null;
  middlename: string | null;
  UserId: string | null;
  collapsing = true;
  displayNoRecords: boolean;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  ngOnInit(): void {
    this.directReport();
    this.firstname = localStorage.getItem('Firstnameses');
    this.lastname = localStorage.getItem('LastNameses');
    this.middlename = localStorage.getItem('Middlenameses');
    this.UserId=localStorage.getItem('CreatedUseridses');
  }
  // dataSource = new MatTableDataSource(this.directReportDetail);
  constructor(private http: HttpClient) {}

    directReport() {
      try {
        this.http.get(
            config_url +
              'employee/GetDirectReport?EmployeeIdSupervisor='+localStorage.getItem('CreatedUseridses')
          )
          .subscribe((data: any) => {
            console.log(data);
            var response = data.DirectReport;
            this.directReportDetail = response;
            this.dataSource.data = response;
            // this.dataSource = new MatTableDataSource<employee>(this.directReportDetail);
          });
      } catch (e) {
        console.log(e);
      }
    }
    // removeRow() {
    //   const data = this.dataSource.data.slice();
    //   data.shift();
    //   this.dataSource.data = data;
    // }
  }

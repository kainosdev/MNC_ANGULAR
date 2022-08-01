import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config_url } from '../shared/constant';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})



export class VendorDashboardComponent implements OnInit {

  displayedColumns: string[] = ['ContractNumber', 'Title', 'Status', 'Department', 'AwardedDate',
  'PlannedStartDate','PlannedEndDate', 'ActualStartDate', 'ActualEndDate', 'ContractingOfficer',
  'TechnicalMonitor','Baseyears','Optionyears'];

  displayedColumns1: string[] = ['BidNumber', 'Title', 'Status', 'Department', 'PostedDate',
  'ResponseDueDate'];

  displayedColumns2: string[] = ['BidNumber', 'Title', 'Status', 'Department',
  'PostedDate', 'ResponseDueDate'];

  displayedColumns3: string[] = ['BidNumber', 'Title', 'Status', 'Department',
  'PostedDate', 'ResponseDueDate'];

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
  lastname: string | null;
  firstname: string | null;
  middlename: string | null;
  UserId: string | null;
  collapsing = true;
  displayNoRecords: boolean;
  displayNoRecords1: boolean;
  displayNoRecords2: boolean;
  displayNoRecords3: boolean;
  //firstname:any;

  Bidslist:any;
  Vendorlist:any;
  Title:any;
  SolicitationTypeId: any;
  BidStatusId: any;
  DepartmentId:any;
  UpdatedDate:any;
  BidResponseDueDate:any;
  //collapsing = true;
  BidsSubmittedlist: any;
  ResponseNotSubmittedlist: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | any;
  


  dtTrigger: Subject<any> = new Subject<void>();



  legalname: string | null;
  Firstname: string | null;
  LastName: string | null;
  favoritebidlist: any;
  vendorfavoritelist: any;
  vendoractiveDetail: any;
  ResponseSubmittedDetail: any;
  ResponseNotSubmittedDetail: any;
  vendorfavoriteDetail: any;
  //dataSource1: any;

  constructor(private http: HttpClient) { }
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource1.paginator = this.paginator1;
      this.dataSource2.paginator = this.paginator2;
      this.dataSource3.paginator = this.paginator3;
      this.dataSource.sort = this.sort;
      this.dataSource1.sort = this.sort1;
      this.dataSource1.sort = this.sort2;
      this.dataSource1.sort = this.sort3;




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

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
    this.dataSource3.filter = filterValue;
  if(this.dataSource3.filteredData.length==0){
   this.displayNoRecords3=true;
  }else{
   this.displayNoRecords3=false;
  }
  }
  ngOnInit(): void {
  
    this.vendoractive();
    this.ResponseSubmitted();
    this.ResponseNotSubmitted();
    this.vendorfavorite();


    this.firstname = localStorage.getItem('Firstnameses');
    this.lastname = localStorage.getItem('LastNameses');
    this.middlename = localStorage.getItem('Middlenameses');
    this.UserId=localStorage.getItem('CreatedUseridses');
  }

 

  
  vendoractive() {
    try {
      this.http.get(
          config_url +
          '/contract/GetVendorActiveContracts?VendorId='+localStorage.getItem('CreatedUseridses')
        )
        .subscribe((data: any) => {
          console.log(data);
          var response = data.VendorActiveContracts;
          this.vendoractiveDetail = response;
          this.dataSource.data = response;
          // this.dataSource = new MatTableDataSource<employee>(this.directReportDetail);
        });
    } catch (e) {
      console.log(e);
    }
  }





  ResponseSubmitted() {
    try {
      this.http.get(
          config_url +
          'bid/GetBidResponseSubmittedByVendor?VendorId='+localStorage.getItem('CreatedUseridses')
        )
        .subscribe((data: any) => {
          console.log(data);
          var response = data.BidResponseSubmitted;
          this.ResponseSubmittedDetail = response;
          this.dataSource1.data = response;
          
        });
    } catch (e) {
      console.log(e);
    }
  }



  ResponseNotSubmitted() {
    try {
      this.http.get(
          config_url +
          'bid/GetBidResponseNotSubmittedByVendor?VendorId='+localStorage.getItem('CreatedUseridses')
        )
        .subscribe((data: any) => {
          console.log(data);
          var response = data.BidResponseNotSubmitted;
          this.ResponseNotSubmittedDetail = response;
          this.dataSource2.data = response;
          
        });
    } catch (e) {
      console.log(e);
    }
  }

  
  vendorfavorite() {
    try {
      this.http.get(
          config_url +
          'vendor/GetVendorFavorite?VendorId='+localStorage.getItem('CreatedUseridses')
        )
        .subscribe((data: any) => {
          console.log(data);
          var response = data.GetVendorFavorite;
          this.vendorfavoriteDetail = response;
          this.dataSource3.data = response;
          
        });
    } catch (e) {
      console.log(e);
    }
  }
  

  

}



import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute,ParamMap, Params, NavigationEnd  } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'bid-management-bid-list',
  templateUrl: './View-Bid.component.html',
  styleUrls: ['./View-Bid.component.scss']
})
export class BidListComponent implements OnInit {

  usertype:any;
  usertype1:any;
  EmpFilter:any;
  VendorFilter:any;
  Empsubmitted =false;
  Vendorsubmitted= false;
  collapsing = true;
  approvalEmployeeDetail:any;
  approvalVendorDetail:any;

  displayedColumns1: string[] = [
    'BidNumber',
    'Title',
    'BidStatus',
    'OpportunityType',
    'Category',
    'SetAside',
    'ContractingOfficer',
    'BudgetAmount',
    'PostedDate',
    'Q&ADuedate',
    'ResponseDueDate',
    'NoOfResponses',
   
  ];

  displayedColumns2: string[] = [
    'BidNumber',
    'Title',
    'BidStatus',
    'OpportunityType',
    'Category',
    'SetAside',
    //'ContractingOfficer',
    //'BudgetAmount',
    'PostedDate',
    'Q&ADuedate',
    'ResponseDueDate',
    'NoOfResponses',
   
  ];

  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  @ViewChild('sort1') sort1 = new MatSort();
  @ViewChild('sort2') sort2 = new MatSort();

  displayNoRecords1: boolean;
  displayNoRecords2: boolean;

  constructor(
    private frmbuilder: FormBuilder,private http: HttpClient,private modalService: NgbModal,private router:Router,
  ) {

   
  }

  ngAfterViewInit() {
    
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator2;

    this.dataSource1.sort = this.sort1;
    this.dataSource2.sort = this.sort2;
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

  ngOnInit(): void {
    // this.employeeapproval();
    this.vendorapproval();
    // debugger
    this.usertype=localStorage.getItem('usertypeses');
    // alert(this.usertype);
    // this.usertype = "EMPLOYE";
    // this.usertype = "INDVI";
    this.EmpFilter = this.frmbuilder.group({
    //   VendorId:[localStorage.getItem('vendoridSes')],
    //  CreatedUserId:[localStorage.getItem("CreatedUseridses")],
   
        //  UserName :new FormControl({value: '', disabled: true}, Validators.required),
        
         //LastName: ['', [Validators.required]],
         BidStatusId: ['', [Validators.required]],
         OpportunityType: ['', [Validators.required]],
   
         Category:['', [Validators.required]],
         SetAsideTypeId:['', [Validators.required]],
   
         ContactingOfficer: ['', [Validators.required]],
         BudgetAmountOver: ['', [Validators.required]],
         BudgetAmountUnder:['', [Validators.required]],
         PostedDate:['', [Validators.required]],
         ResponseDueDate:['', [Validators.required]],
   
   
        });



        this.VendorFilter = this.frmbuilder.group({
          //   VendorId:[localStorage.getItem('vendoridSes')],
          //  CreatedUserId:[localStorage.getItem("CreatedUseridses")],
         
              //  UserName :new FormControl({value: '', disabled: true}, Validators.required),
              
               //LastName: ['', [Validators.required]],
               BidStatusId: ['', [Validators.required]],
               OpportunityType: ['', [Validators.required]],
         
               Category:['', [Validators.required]],
               SetAsideTypeId:['', [Validators.required]],
         
              //  ContactingOfficer: [],
              //  BudgetAmountOver: [],
              //  BudgetAmountUnder:[],
               PostedDate:[],
               ResponseDueDate:[],
              //  ResponseStatus:[]
         
              });
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

  get vf() {
    return this.EmpFilter.controls;
  }

  get vf1() {
    return this.VendorFilter.controls;
  }

  ApplyEmpFilter(EmpFilter:any){
    this.Empsubmitted=true;
console.log(EmpFilter);
  }

  ApplyVendorFilter(VendorFilter:any){
    this.Vendorsubmitted=true;
    console.log(VendorFilter);
  }

}
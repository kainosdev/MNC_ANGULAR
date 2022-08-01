import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl, ValidationErrors, AbstractControl, ValidatorFn} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute,ParamMap, Params, NavigationEnd  } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import * as moment from 'moment';
import { Moment } from 'moment';

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
  Emppostdateobj:any;
  Emppostdateobj1:any;
  EmpResponseDueDateobj:any;
  EmpResponseDueDateobj1:any;

  EmppostdateStartDate:any;
  
  EmppostdateEndDate:any;

  EmpResponseDueStartDate:any;
  EmpResponseDueEndDate:any;


  Vendorpostdateobj:any;
  Vendorpostdateobj1:any;
  VendorResponseDueDateobj:any;
  VendorResponseDueDateobj1:any;

  VendorpostdateStartDate:any;
  
  VendorpostdateEndDate:any;

  VendorResponseDueStartDate:any;
  VendorResponseDueEndDate:any;

  bidstatus:any;
  opportunity_type_list:any;
  aside_type_list:any;

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
    this.GetBidStatus();
    this.GetOpportunity_type();
    this.vendorapproval();
    this.GetSet_aside();
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
               PostedDate:['', [Validators.required]],
               ResponseDueDate:['', [Validators.required]],
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

  convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  ApplyEmpFilter(EmpFilter:any){
    // console.log(EmpFilter.PostedDate);
    // console.log(EmpFilter.ResponseDueDate);
    // alert(this.EmpFilter.get('PostedDate').value)
if(this.EmpFilter.get('PostedDate').value != ''){
this.Emppostdateobj = EmpFilter.PostedDate.startDate;

this.EmppostdateStartDate = this.Emppostdateobj.$d;
this.EmppostdateStartDate = this.convert(this.EmppostdateStartDate);
// console.log(this.EmppostdateStartDate);
this.Emppostdateobj1 = EmpFilter.PostedDate.endDate;

this.EmppostdateEndDate = this.Emppostdateobj1.$d;
// console.log(this.EmppostdateEndDate);


this.EmppostdateEndDate = this.convert(this.EmppostdateEndDate);
    

EmpFilter.EmppostdateStartDate = this.EmppostdateStartDate;
EmpFilter.EmppostdateEndDate = this.EmppostdateEndDate;

}

console.log(EmpFilter);

if(this.EmpFilter.get('ResponseDueDate').value != ''){
  this.EmpResponseDueDateobj = EmpFilter.ResponseDueDate.startDate;
  this.EmpResponseDueDateobj1 = EmpFilter.ResponseDueDate.endDate;
  // console.log(this.EmpResponseDueDateobj.$d);

  this.EmpResponseDueStartDate = this.EmpResponseDueDateobj.$d;
// console.log(this.EmppostdateStartDate);
this.EmpResponseDueStartDate = this.convert(this.EmpResponseDueStartDate);

this.EmpResponseDueEndDate = this.EmpResponseDueDateobj1.$d;
// console.log(this.EmppostdateEndDate);
this.EmpResponseDueEndDate = this.convert(this.EmpResponseDueEndDate);

EmpFilter.EmpResponseDueStartDate = this.EmpResponseDueStartDate;
EmpFilter.EmpResponseDueEndDate = this.EmpResponseDueEndDate;
  }

// console.log(EmpFilter);

if(this.EmpFilter.get('BidStatusId').valid || this.EmpFilter.get('OpportunityType').valid ||
     this.EmpFilter.get('Category').valid || this.EmpFilter.get('SetAsideTypeId').valid ||
     this.EmpFilter.get('ContactingOfficer').valid || this.EmpFilter.get('BudgetAmountOver').valid || 
     this.EmpFilter.get('BudgetAmountUnder').valid || this.EmpFilter.get('PostedDate').valid ||
     this.EmpFilter.get('ResponseDueDate').valid) {
      // console.log("if");
      // alert(this.EmpFilter.get('PostedDate').valid);
      this.Empsubmitted=true;
      return false;
    } else {
      // console.log("else");
      (document.getElementById('ErrormsgForEmp') as HTMLFormElement).style.display = "block";
      this.Empsubmitted=false;
      return true;
    }

  }

  RemoveErrorMsgEmp(){
    (document.getElementById('ErrormsgForEmp') as HTMLFormElement).style.display = "none";
  }

  public disableIt(evt:any) {
    if (evt.keyCode === 13 || evt.keyCode === 9) {
        evt.target.tagName.disabled  = true;
     }
 }

  ApplyVendorFilter(VendorFilter:any){
    // this.Vendorsubmitted=true;
    console.log(VendorFilter);

    if(this.VendorFilter.get('PostedDate').value != ''){
      this.Vendorpostdateobj = VendorFilter.PostedDate.startDate;
      
      this.VendorpostdateStartDate = this.Vendorpostdateobj.$d;
      this.VendorpostdateStartDate = this.convert(this.VendorpostdateStartDate);
      // console.log(this.EmppostdateStartDate);
      this.Vendorpostdateobj1 = VendorFilter.PostedDate.endDate;
      
      this.VendorpostdateEndDate = this.Vendorpostdateobj1.$d;
      // console.log(this.EmppostdateEndDate);
      
      
      this.VendorpostdateEndDate = this.convert(this.VendorpostdateEndDate);
          
      
      VendorFilter.VendorpostdateStartDate = this.VendorpostdateStartDate;
      VendorFilter.VendorpostdateEndDate = this.VendorpostdateEndDate;
      
      }

      if(this.VendorFilter.get('ResponseDueDate').value != ''){
        this.VendorResponseDueDateobj = VendorFilter.ResponseDueDate.startDate;
        this.VendorResponseDueDateobj1 = VendorFilter.ResponseDueDate.endDate;
        // console.log(this.EmpResponseDueDateobj.$d);
      
        this.VendorResponseDueStartDate = this.VendorResponseDueDateobj.$d;
      // console.log(this.EmppostdateStartDate);
      this.VendorResponseDueStartDate = this.convert(this.VendorResponseDueStartDate);
      
      this.VendorResponseDueEndDate = this.VendorResponseDueDateobj1.$d;
      // console.log(this.EmppostdateEndDate);
      this.VendorResponseDueEndDate = this.convert(this.VendorResponseDueEndDate);
      
      VendorFilter.VendorResponseDueStartDate = this.VendorResponseDueStartDate;
      VendorFilter.VendorResponseDueEndDate = this.VendorResponseDueEndDate;
        }

        console.log(VendorFilter);
        if(this.VendorFilter.get('BidStatusId').valid || this.VendorFilter.get('Category').valid ||
     this.VendorFilter.get('SetAsideTypeId').valid || this.VendorFilter.get('PostedDate').valid ||
     this.VendorFilter.get('ResponseDueDate').valid ) {
      console.log("if");
      // alert(this.EmpFilter.get('PostedDate').valid);
      // this.Empsubmitted=true;
      return false;
    } else {
      console.log("else");
      (document.getElementById('ErrormsgForEmp') as HTMLFormElement).style.display = "block";
      // this.Empsubmitted=false;
      return true;
    }
  }


  GetBidStatus(){
    try
    {
      this.http.get(config_url+'/app/BidStatus').subscribe(
        (data: any) => {
          var response= data.BidStatus;
          this.bidstatus = response;
           // console.log(this.bidstatus)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }

  GetOpportunity_type(){
    try
    {
      this.http.get(config_url+'/app/Opportunity').subscribe(
        (data: any) => {
          var response= data.Opportunity;
          this.opportunity_type_list = response;
           // console.log(this.opportunity_type_list)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }

  GetSet_aside(){
    try
    {
      this.http.get(config_url+'/app/SetAsideType').subscribe(
        (data: any) => {
          var response= data.SetAsideType;
          this.aside_type_list = response;
           // console.log(this.aside_type_list)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }


  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment()
        .subtract(1, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ],
    'Last 3 Month': [
      moment()
        .subtract(3, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ]
  };

}
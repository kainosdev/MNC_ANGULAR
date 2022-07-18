import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import { RestApiService } from '../shared/rest-api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-bid-management',
  templateUrl: './bid-management.component.html',
  styleUrls: ['./bid-management.component.scss'],
})
<<<<<<< HEAD
export class BidmanagementComponent implements OnInit { 

  dtOptions: DataTables.Settings = {};
  title = 'datatables';

=======
export class BidmanagementComponent implements OnInit {
  displayStyle = 'none';

  title = 'datatables';
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
>>>>>>> 1110c14e433fafad1278c3ca719378cb18849eeb

  bid_form: FormGroup | any;
  submitted = false;
  bid_form_show = true;
  bidstatus: any;
  contractVehicle: any;
  aside_type_list: any;
  opportunity_type_list: any;
  contract_officer_list: any;
  viewbiddetail: any;
  stepname = 'Details';
  a = '1';
  b = '2';
  c = '3';
  collapsing = true;

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  posteddate: any;
  duedate: any;

  constructor(
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    private restApi: RestApiService
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
=======
    this.viewbiddetail = [];
    this.GetViewBid1();
>>>>>>> 1110c14e433fafad1278c3ca719378cb18849eeb

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
<<<<<<< HEAD
      processing: true
=======
      processing: true,
>>>>>>> 1110c14e433fafad1278c3ca719378cb18849eeb
    };

    this.personalDetails = this.frmbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.addressDetails = this.frmbuilder.group({
      city: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
    });
    this.educationalDetails = this.frmbuilder.group({
      highest_qualification: ['', Validators.required],
      university: ['', Validators.required],
      total_marks: ['', Validators.required],
    });
    this.bid_form = this.frmbuilder.group({
      bidstatus: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      opportunity_type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      buying_entry: ['', [Validators.required]],
      set_aside: ['', [Validators.required]],
      contrcat_officer: ['', [Validators.required]],
      co_officer_phone: ['', [Validators.required]],
      co_officer_email: ['', [Validators.required]],
      no_of_response: ['', [Validators.required]],

      fund_source: ['', [Validators.required]],
      contract_vehicle: ['', [Validators.required]],
      budget_amount: ['', [Validators.required]],
      posted_date: ['', [Validators.required]],
      question_due_date: ['', [Validators.required]],
      response_due_date: ['', [Validators.required]],
      dbe_goal: ['', [Validators.required]],

      //contact details
      FirstName: ['', [Validators.required]],
      legalbusiness: [''],
      LastName: ['', [Validators.required]],
      tradeName: [],
      // UserTypeId:  ['', [Validators.required]],
      UserId: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]],
      conformpassword: ['', [Validators.required]],

      Address1: ['', [Validators.required]],
      Address2: [],
      StateId: ['', [Validators.required]],
      CityId: ['', [Validators.required]],
      Zipcode: ['', [Validators.required]],
      county_name: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      CountryId: ['', [Validators.required]],
      UserStatusId: ['N'],
    });
    this.GetBidStatus();
    this.GetContract_vehicle();
    this.GetSet_aside();
    this.GetOpportunity_type();
    this.GetContract_officer();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.viewbiddetail);
    });
  }
  get personal() {
    return this.personalDetails.controls;
  }
  get education() {
    return this.educationalDetails.controls;
  }
  get address() {
    return this.addressDetails.controls;
  }
  get bfc() {
    return this.bid_form.controls;
  }

  GetBidStatus() {
    try {
      this.http.get(config_url + '/app/BidStatus').subscribe((data: any) => {
        var response = data.data.BidStatus;
        this.bidstatus = response;
        console.log(this.bidstatus);
      });
    } catch (e) {
      console.log(e);
    }
  }

  GetContract_vehicle() {
    try {
      this.http
        .get(config_url + '/app/ContractVehicle')
        .subscribe((data: any) => {
          var response = data.data.ContractVehicle;
          this.contractVehicle = response;
          console.log(this.contractVehicle);
        });
    } catch (e) {
      console.log(e);
    }
  }
  GetOpportunity_type() {
    try {
      this.http.get(config_url + '/app/Opportunity').subscribe((data: any) => {
        var response = data.data.Opportunity;
        this.opportunity_type_list = response;
        console.log(this.opportunity_type_list);
      });
    } catch (e) {
      console.log(e);
    }
  }
  GetSet_aside() {
    try {
      this.http.get(config_url + '/app/SetAsideType').subscribe((data: any) => {
        var response = data.data.SetAsideType;
        this.aside_type_list = response;
        console.log(this.aside_type_list);
      });
    } catch (e) {
      console.log(e);
    }
  }
  GetContract_officer() {
    try {
      this.http
        .get(config_url + '/app/ContractingofficerByJobtitle')
        .subscribe((data: any) => {
          var response = data.data.contractingofficer;
          this.contract_officer_list = response;
          console.log(this.contract_officer_list);
        });
    } catch (e) {
      console.log(e);
    }
  }
  generalsave() {
    this.submitted = true;
    let usertype_id = (<HTMLInputElement>document.getElementById('usertype_id'))
      .value;
    if (usertype_id == 'EMPLOY') {
      if (this.bid_form.invalid) {
        return;
      } else {
        alert(JSON.stringify(this.bid_form.value));
      }
    }
  }
  next() {
    if (this.step == 1) {
      this.personal_step = true;
      // if (this.personalDetails.invalid)
      // { return
      // }
      this.step++;
    } else if (this.step == 2) {
      this.address_step = true;
      // if (this.addressDetails.invalid) { return }
      this.step++;
    } else if (this.step == 3) {
      this.address_step = true;
      // if (this.addressDetails.invalid) { return }
      this.step++;
    }
  }
  previous() {
    this.step--;
    if (this.step == 1) {
      this.personal_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }
  }

  submit() {
    if (this.step == 3) {
      this.education_step = true;
      if (this.educationalDetails.invalid) {
        return;
      }
    }
  }

  inputErrorMessage(errormessage: any) {
    (document.getElementById(errormessage) as HTMLFormElement).classList.remove(
      'validation'
    );
  }

  inputErrorMessage1(errormessage: any) {
    (document.getElementById('passvalidationid') as HTMLFormElement).innerText =
      'Passwords must match.!';
  }
  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  GetViewBid1() {
    //  alert("in");

    return this.restApi.GetViewBid().subscribe((viewbiddata: {}) => {
      console.log('hi');
      console.log(viewbiddata);
      this.viewbiddetail = viewbiddata;

      this.viewbiddetail = this.viewbiddetail.ViewBid;
      console.log(this.viewbiddetail);
      this.dtTrigger.next(this.viewbiddetail);

      for (let i = 0; i < this.viewbiddetail.length; i++) {
        this.posteddate = this.viewbiddetail[i].BidPostedDate.split(' ')[0];
        this.duedate = this.viewbiddetail[i].BidResponseDueDate.split(' ')[0];
        console.log(this.posteddate);
        console.log(this.duedate);
      }
      //console.log("hi")
      //  this.viewbiddetail = this.viewbiddetail.ViewBid;
      //  this.dtTrigger.next(this.vendorDetail);

      //   console.log("vendorDetail test>>>>",this.vendorDetail);
    });
  }
}

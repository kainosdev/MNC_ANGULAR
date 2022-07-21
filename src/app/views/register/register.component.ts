import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors,} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config_url } from '../shared/constant';
// import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../_helpers/must-match.validator';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

//  registercontactinformation:any;
employeeform: FormGroup | any;
otherform: FormGroup | any;
vendorform_individual:FormGroup | any;
vendorform_business:FormGroup | any;
uidPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}";
public mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
public mask1 = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

 submitted = false;
 usertype="VENDOR";
 vendortype=true;
 employeeform_show=false;
 vendorform_individual_show=false;
 vendorform_business_show=true;
 vendortype_show=true;
 otherform_show=false;
  vendor: any;
  employeeinformation:any;
  jobdetail: any;
  jobtitle: any;
  employeedetail: any;
  employeetype: any;
  statetype:any;
  userdata:any;
  usertypedata:any;
  zipcodelist:any;
  zipcodedetail: any;
   countrytype: any;
  countrydetail: any;
  beclassificationtype: any;
  beclassificationdetail:any;
  citylist: any;
  cityalldetail:any;
  statedetails:any;
  zip:any;
  zipdetail :any;
  zip2:any;


  constructor(private frmbuilder: FormBuilder,  private http: HttpClient,
  //  private toastr: ToastrService
    ) { }

  ngOnInit(): void {

    this.gejobtitledata();
    this.getemployeedata();
    this.getusertypedata();
    // this.getcountrydata();
    this.getbeclassificationdata();
    this.Getcityall_list();
    // this.getvendorlist()
    this. Getallzipcode_list();

    this.employeeform = this.frmbuilder.group({

     //contact details
      FirstName: ['', [Validators.required]],
      legalbusiness: [''],
      LastName:  ['', [Validators.required]],
      tradeName: [],
      // UserTypeId:  ['', [Validators.required]],
      UserId:  ['', [Validators.required]],
      UserPassword:  ['', [Validators.required]],
      conformpassword:  ['', [Validators.required]],

      Address1:  ['', [Validators.required]],
      Address2: [],
      StateId:  ['', [Validators.required]],
      CityId:  ['', [Validators.required]],
      Zipcode: ['', [Validators.required]],
      DistrictId: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: [''],
      CountryId:  ['', [Validators.required]],
     //employee details
      JobTitleId:['', [Validators.required]],
      EmploymentTypeId:['', [Validators.required]],
      JobStartDate: ['', [Validators.required]],
      AdminUser:  [false],
      Phone:['', [Validators.required]],



      BusinessRegisteredInSCC: [],
      VendorTypeId: [],
      EIN_SSN:[],


      OutreachEmailOptIn:[],
      business_ssn: [],
      BusinessSize: [],
      BusinessRegisteredInDistrict:[],
      BusinessIsFranchisee: [],
      BEClassificationId: [],


      UserStatusId:['N'],

},{validator: this.checkIfMatchingPasswords('UserPassword', 'conformpassword')});

this.otherform = this.frmbuilder.group({

  //contact details
   FirstName: ['', [Validators.required]],
   legalbusiness: [''],
   LastName:  ['', [Validators.required]],
   tradeName: [],
   // UserTypeId:  ['', [Validators.required]],
   UserId:  ['', [Validators.required]],
   UserPassword:  ['', [Validators.required]],
   conformpassword:  ['', [Validators.required]],

   Address1:  ['', [Validators.required]],
   Address2: [],
   StateId:  ['', [Validators.required]],
   CityId:  ['', [Validators.required]],
   Zipcode: ['', [Validators.required]],
   DistrictId: ['', [Validators.required]],
   StartDate: ['', [Validators.required]],
   EndDate: [''],
   CountryId:  ['', [Validators.required]],
   UserStatusId:['N'],

  },{validator: this.checkIfMatchingPasswords('UserPassword', 'conformpassword')});

this.vendorform_individual = this.frmbuilder.group({


  FirstName: ['', [Validators.required]],
  legalbusiness: [''],
  LastName:  ['', [Validators.required]],
  tradeName: [],
  // UserTypeId:  ['', [Validators.required]],
  UserId:  ['', [Validators.required]],
  UserPassword:  ['', [Validators.required]],
  conformpassword:  ['', [Validators.required]],

  Address1:  ['', [Validators.required]],
  Address2: [],
  StateId:  ['', [Validators.required]],
   CityId:  ['', [Validators.required]],
  Zipcode: ['', [Validators.required]],
  county_name: ['', [Validators.required]],
  DistrictId: ['', [Validators.required]],
  CountryId:  ['', [Validators.required]],
  StartDate: ['', [Validators.required]],
  EndDate: [''],
  VendorTypeId: [],
  EIN_SSN: ['', [Validators.required]],


  OutreachEmailOptIn:[],
  business_ssn: [],
  BusinessSize: [],
  BusinessRegisteredInDistrict:[],
  BusinessIsFranchisee: [],
  BEClassificationId: [],

  JobTitleId:[],
  EmploymentTypeId:[],
  JobStartDate: [],
  BusinessRegisteredInSCC: [],

  Phone:[],
  AdminUser: [],
  UserStatusId:['N'],
},{validator: this.checkIfMatchingPasswords('UserPassword', 'conformpassword')});

this.vendorform_business = this.frmbuilder.group({


  FirstName: ['', [Validators.required]],
  legalbusiness: [''],
  LastName:  ['', [Validators.required]],
  tradeName: [],
  // UserTypeId:  ['', [Validators.required]],
  UserId:  ['', [Validators.required]],
  UserPassword:  ['', [Validators.required]],
  conformpassword:  ['', [Validators.required]],

  Address1:  ['', [Validators.required]],
  Address2: [],
  StateId:  ['', [Validators.required]],
   CityId:  ['', [Validators.required]],
  Zipcode: ['', [Validators.required]],
  county_name: ['', [Validators.required]],
  DistrictId: ['', [Validators.required]],
  CountryId:  ['', [Validators.required]],
  StartDate: ['', [Validators.required]],
  EndDate: [''],
  VendorTypeId: [],
  EIN_SSN:[],

  OutreachEmailOptIn:[true],
  business_ssn: ['', [Validators.required]],
  BusinessSize: ['', [Validators.required]],
  BusinessRegisteredInDistrict:[false],
  BusinessIsFranchisee: [false],
  BEClassificationId: [],

  JobTitleId:[],
  EmploymentTypeId:[],
  JobStartDate: [],
  BusinessRegisteredInSCC: [false],

  Phone:[],
  AdminUser: [],
  UserStatusId:['N'],

},{validator: this.checkIfMatchingPasswords('UserPassword', 'conformpassword')});



}

phoneformat= /^[0-9]{10}$/;
socialno =  /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
useridmatch=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {

    let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];

    if (passwordConfirmationInput.value == '') {
      return passwordConfirmationInput.setErrors({required: true})
    }
    else if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true})
    }
    else {
        return passwordConfirmationInput.setErrors(null);
    }
  }
}

alpha(event: any)
{
      var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
}
alphanumeric(event: any)
{
  var inp = String.fromCharCode(event.keyCode);
  if (/[a-zA-Z0-9]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}
get rcf()
{
  return this.employeeform.controls;
}
get vif()
{
  return this.vendorform_individual.controls;
}

get vbf()
{
  return this.vendorform_business.controls;
}

get ofv() {
  return this.otherform.controls;
}
number(event: any) {
  var charCode = (event.which) ? event.which : event.keyCode;

  if ((charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

  // validation(registeremployecontactinformation:any){
  //   this.submitted=true;
  //   // this.toastr.error("Holiday deleted");
  //   console.log( 'Contact Information',registercontactinformation);


  //   let FirstName = this.registercontactinformation.get('FirstName').value;
  //   let legalbusiness = this.registercontactinformation.get('legalbusiness').value;
  //   let LastName = this.registercontactinformation.get('LastName').value;
  //   let tradeName = this.registercontactinformation.get('tradeName').value;
  //   let UserTypeId = this.registercontactinformation.get('UserTypeId').value;
  //   // alert(UserTypeId);
  //   let UserId = this.registercontactinformation.get('UserId').value;
  //   let UserPassword = this.registercontactinformation.get('UserPassword').value;
  //   let conformpassword = this.registercontactinformation.get('conformpassword').value;



  //   let Address1 = this.registercontactinformation.get('Address1').value;
  //   let Address2 = this.registercontactinformation.get('Address2').value;
  //   let StateId = this.registercontactinformation.get('StateId').value;
  //   let CityId = this.registercontactinformation.get('CityId').value;
  //   let Zipcode = this.registercontactinformation.get('Zipcode').value;
  //   let county_name = this.registercontactinformation.get('county_name').value;
  //   let CountryId = this.registercontactinformation.get('CountryId').value;
  //   let StartDate = this.registercontactinformation.get('StartDate').value;
  //   let EndDate = this.registercontactinformation.get('EndDate').value;


  //   let active1 = (<HTMLInputElement>document.getElementById("active")).checked;

  //   let EIN_SSN = this.registercontactinformation.get('EIN_SSN').value;
  //   let business_ssn = this.registercontactinformation.get('business_ssn').value;
  //   let BusinessSize = this.registercontactinformation.get('BusinessSize').value;
  //   let BusinessRegisteredInDistrict = this.registercontactinformation.get('BusinessRegisteredInDistrict').value;
  //   let BEClassificationId = this.registercontactinformation.get('BEClassificationId').value;
  //   let BusinessRegisteredInSCC = this.registercontactinformation.get('BusinessRegisteredInSCC').value;
  //   let BusinessIsFranchisee = this.registercontactinformation.get('BusinessIsFranchisee').value;

  //   let JobTitleId = this.registercontactinformation.get('JobTitleId').value;
  //   let EmploymentTypeId = this.registercontactinformation.get('EmploymentTypeId').value;
  //   let JobStartDate = this.registercontactinformation.get('JobStartDate').value;

  //   let Phone = this.registercontactinformation.get('Phone').value;


  //   let usertype_id = (<HTMLInputElement>document.getElementById("usertype_id")).value;

  //   if(FirstName == null || FirstName == "")
  //     {
  //      (document.getElementById('firstname_id') as HTMLFormElement).classList.add("validation");
  //    }
  //    if(legalbusiness == null || legalbusiness == "")
  //    {
  //     (document.getElementById('legal_id') as HTMLFormElement).classList.add("validation");
  //   }
  //    if(LastName == null || LastName == "")
  //     {
  //     (document.getElementById('lastname_id') as HTMLFormElement).classList.add("validation");
  //    }
  //    if(tradeName == null || tradeName == "")
  //    {
  //    (document.getElementById('trade_id') as HTMLFormElement).classList.add("validation");
  //   }

  //    if(UserTypeId == null || UserTypeId == "")
  //    {
  //    (document.getElementById('usertype_id') as HTMLFormElement).classList.add("validation");
  //     }
  //     if(UserId == null || UserId == "")
  //    {
  //     (document.getElementById('userkey') as HTMLFormElement).classList.add("validation");
  //     }
  //    if(UserPassword == null || UserPassword == "")
  //    {
  //     (document.getElementById('userpswd_id') as HTMLFormElement).classList.add("validation");
  //     }
  //     if(conformpassword == null || conformpassword == "")
  //    {
  //     (document.getElementById('comformpswd_id') as HTMLFormElement).classList.add("validation");
  //     }

  //     if(Address1 == null || Address1 == "")
  //     {
  //      (document.getElementById('currentadd_id') as HTMLFormElement).classList.add("validation");
  //      }
  //      if(Address2 == null || Address2 == "")
  //      {
  //       (document.getElementById('currentsecadd_id') as HTMLFormElement).classList.add("validation");
  //       }

  //        if(Zipcode == null || Zipcode == "")
  //       {
  //        (document.getElementById('regcurrentzip_id') as HTMLFormElement).classList.add("validation");
  //        }
  //        if(CityId == null || CityId == "")
  //       {
  //        (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
  //        }
  //        if(StateId == null || StateId == "")
  //        {
  //         (document.getElementById('curstate_id') as HTMLFormElement).classList.add("validation");
  //         }
  //        if(county_name == null || county_name == "")
  //        {
  //         (document.getElementById('county_id') as HTMLFormElement).classList.add("validation");
  //         }
  //         if(CountryId == null || CountryId =="")
  //         {
  //          (document.getElementById('country_id') as HTMLFormElement).classList.add("validation");
  //          }
  //          if(StartDate == null || StartDate == "")
  //          {
  //           (document.getElementById('startdate_id') as HTMLFormElement).classList.add("validation");
  //           }
  //           if(EndDate == null || EndDate == "")
  //           {
  //            (document.getElementById('enddata_id') as HTMLFormElement).classList.add("validation");
  //            }

  //          if(!UserId.match(this.useridmatch)){

  //           (document.getElementById('userkey') as HTMLFormElement).classList.add("validation");
  //         }

  //    if(UserPassword != (conformpassword)){

  //     (document.getElementById('comformpswd_id') as HTMLFormElement).classList.add("validation");

  //     (document.getElementById('passvalidationid') as HTMLFormElement).innerText = 'Passwords must match.!'
  //   }


  //   if(usertype_id == "EMPLOY"){


  //     if(JobTitleId == null || JobTitleId == "")
  //     {
  //      (document.getElementById('job_title') as HTMLFormElement).classList.add("validation");
  //      }
  //      if(EmploymentTypeId == null || EmploymentTypeId == "")
  //     {
  //      (document.getElementById('employee_id') as HTMLFormElement).classList.add("validation");
  //      }
  //      if(JobStartDate == null || JobStartDate == "")
  //      {
  //       (document.getElementById('jobstartdate_id') as HTMLFormElement).classList.add("validation");
  //       }
  //      if(Phone == null || Phone == "")
  //     {
  //      (document.getElementById('phoneno_id') as HTMLFormElement).classList.add("validation");
  //      }

  //   }

  //   if(usertype_id == "VENDOR"){

  //  if(active1 == false){

  // if(EIN_SSN == null || EIN_SSN == ""){
  //     (document.getElementById('socialno_id') as HTMLFormElement).classList.add("validation");
  //   }

  //   }


  //   else{

  //     if(business_ssn == null || business_ssn == ""){
  //       (document.getElementById('busssn_id') as HTMLFormElement).classList.add("validation");
  //     }
  //     if(BusinessSize == null || BusinessSize == ""){
  //       (document.getElementById('business_id') as HTMLFormElement).classList.add("validation");
  //     }
  //    if(BEClassificationId == null || BEClassificationId == ""){
  //       (document.getElementById('be_classificationid') as HTMLFormElement).classList.add("validation");
  //     }

  //     }
  //     }

  //     if((FirstName != null) && (LastName != null || LastName != "") && (tradeName != "" || tradeName != null) && (UserId != null || UserId != "") && (UserPassword != null || UserPassword != "") && (Address1 != null || Address1 != "") && (Address2 != null || Address2 != "") && (StateId != null || StateId != "") &&
  //       (CityId != null || CityId != "") && (Zipcode != null || Zipcode != "") && (CountryId != null || CountryId != "") && (StartDate != null || StartDate != "") && (EndDate != null || EndDate != "")){


  //         // if(usertype_id == "OTHER"){

  //         //   if((FirstName != null || FirstName != "") && (LastName != null || LastName != "") && (UserId != null || UserId != "") && (UserPassword != null || UserPassword != "") &&  (StateId != null || StateId != "") &&
  //         //   (EndDate != null || EndDate != "") && (Address1 != null || Address1 != "") && (Address2 != null || Address2 != "") && (CityId != null || CityId != "") && (Zipcode != null || Zipcode != "") && (CountryId != null || CountryId != "")){

  //         //     this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/AdduserDetails', this.registercontactinformation).subscribe(

  //         //       data => {
  //         //         console.log("data");
  //         //           console.log('POST Request is successful >>>>>>>>', data);

  //         //       },
  //         //       success => {
  //         //         console.log("success");
  //         //       }
  //         //     );

  //         //   }

  //         // }



  //         if(usertype_id == "EMPLOY"){


  //           if((JobTitleId != null) && (EmploymentTypeId != null) && (JobStartDate != null) && (Phone != null) ){
  //           // if((JobTitleId != null || JobTitleId != "") && (EmploymentTypeId != null || EmploymentTypeId != "") && (JobStartDate != null || JobStartDate != "") && (Phone != null || Phone != "") ){


  //             this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/AdduserDetails', registercontactinformation).subscribe(

  //               data => {
  //                 console.log("data");
  //                   console.log('POST Request is successful >>>>>>>>', data);

  //               },
  //               success => {
  //                 console.log("success");
  //               }
  //             );
  //             window.setTimeout(function(){location.reload()},100);
  //           }

  //         }



  //         if(usertype_id == "VENDOR"){


  //           if(active1 == false){

  //             if((EIN_SSN != null) && (StartDate != null) && (EndDate != null)){
  //               alert("vendor individual");
  //               this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/AdduserDetails', registercontactinformation).subscribe(

  //               data => {
  //                 console.log("data");
  //                   console.log('POST Request is successful >>>>>>>>', data);

  //               },
  //               success => {
  //                 console.log("success");
  //               }
  //             );
  //             window.setTimeout(function(){location.reload()},100);
  //           }
  //          if(!EIN_SSN.match(this.socialno)){
  //                (document.getElementById('socialno_id') as HTMLFormElement).classList.add("validation");
  //               }
  //             }
  //           }

  //           if(usertype_id == "VENDOR"){


  //             if(active1 == true){

  //             if((legalbusiness != null)&&(BusinessSize != null) && (BusinessRegisteredInDistrict != null)&& (BusinessRegisteredInSCC != null) && (BusinessIsFranchisee != null) && (BEClassificationId != null) && (StartDate != null) && (EndDate != null)){
  //               // alert("vendor business");

  //               this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/AdduserDetails', registercontactinformation).subscribe(

  //               data => {
  //                 console.log("data");
  //                   console.log('POST Request is successful >>>>>>>>', data);

  //               },
  //               success => {
  //                 console.log("success");
  //               }
  //             );
  //             window.setTimeout(function(){location.reload()},100);
  //           }
  //         }
  //             }


  //           }

  // // }
  // }
  cancelform()
  {
    this.submitted=false;
  }

  inputErrorMessage(errormessage: any) {

    (document.getElementById(errormessage) as HTMLFormElement).classList.remove("validation");

    }

    inputErrorMessage1(errormessage: any) {

      (document.getElementById('passvalidationid') as HTMLFormElement).innerText = 'Passwords must match.!'

      }

    vendortype_display(active:any){
      // debugger
    //  let active1 = (<HTMLInputElement>document.getElementById("active")).checked;

      if(this.vendortype == true){

        // (<HTMLInputElement>document.getElementById("vendorbusiness")).style.display ="block";
        // (<HTMLInputElement>document.getElementById("vendorindividual")).style.display ="none";
        // (<HTMLInputElement>document.getElementById("busname1")).style.display ="block";
        // (<HTMLInputElement>document.getElementById("busname2")).style.display ="block";
        // (<HTMLInputElement>document.getElementById("indname1")).style.display ="none";
        // (<HTMLInputElement>document.getElementById("indname2")).style.display ="none";

        this.employeeform_show=false;
        this.otherform_show=false;
        this.vendorform_individual_show=false;
        this.vendorform_business_show=true;
        this.submitted = false;
      }


      else if(this.vendortype == false){

        // (<HTMLInputElement>document.getElementById("vendorbusiness")).style.display ="none";
        // (<HTMLInputElement>document.getElementById("vendorindividual")).style.display ="block";
        // (<HTMLInputElement>document.getElementById("busname1")).style.display ="none";
        // (<HTMLInputElement>document.getElementById("busname2")).style.display ="none";
        // (<HTMLInputElement>document.getElementById("indname1")).style.display ="block";
        // (<HTMLInputElement>document.getElementById("indname2")).style.display ="block";

        this.employeeform_show=false;
        this.otherform_show=false;
        this.vendorform_individual_show=true;
        this.vendorform_business_show=false;
        this.submitted = false;

      }
    }

    vendordetails_display(){
      let usertype_id = (<HTMLInputElement>document.getElementById("usertype_id")).value;

      if(usertype_id == 'EMPLOY')
      {
       this.employeeform_show=true;
       this.otherform_show=false;
       this.vendorform_individual_show=false;
       this.vendorform_business_show=false;
       this.submitted = false;
       this.vendortype_show =false;
      }
      else if(usertype_id == 'OTHER')
      {
        this.otherform_show=true;
        this.employeeform_show=false;
        this.vendorform_individual_show=false;
        this.vendorform_business_show=false;
        this.submitted = false;
        this.vendortype_show =false;
      }
      else if(usertype_id == 'INDIVI')
      {
        this.otherform_show=false;
        this.employeeform_show=false;
       // this.vendorform_individual_show=true;
        this.submitted = false;
       this.vendorform_business_show=false;
        this.vendorform_individual_show =true; 

        // this.vendortype_display(true)

      }
      else if(usertype_id == 'BUSINE')
      {
        this.otherform_show=false;
        this.employeeform_show=false;
       // this.vendorform_individual_show=true;
        this.submitted = false;
       this.vendorform_business_show=true;
        this.vendorform_individual_show =false; 

        // this.vendortype_display(true)

      }

    //   if(usertype_id == 'VENDOR'){

    //     (<HTMLInputElement>document.getElementById("vendordetails")).style.display ="block";
    //     (<HTMLInputElement>document.getElementById("employeeinfo")).style.display ="none";
    //   }
    // else  if(usertype_id == 'EMPLOY'){
    //     (<HTMLInputElement>document.getElementById("employeeinfo")).style.display ="block";
    //     (<HTMLInputElement>document.getElementById("vendordetails")).style.display ="none";
    //    }

    //   else {
    //     (<HTMLInputElement>document.getElementById("vendordetails")).style.display ="none";
    //     (<HTMLInputElement>document.getElementById("employeeinfo")).style.display ="none";
    //   }

    //   if(usertype_id == 'EMPLOY'){

    //     (document.getElementById('socialno_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('busssn_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('business_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('be_classificationid') as HTMLFormElement).classList.remove("validation");

    //   }
    //   else if(usertype_id == 'VENDOR'){

    //     (document.getElementById('job_title') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('employee_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('jobstartdate_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('phoneno_id') as HTMLFormElement).classList.remove("validation");
    //   }

    //   else if(usertype_id == 'OTHER'){

    //     (document.getElementById('socialno_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('busssn_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('business_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('be_classificationid') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('job_title') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('employee_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('jobstartdate_id') as HTMLFormElement).classList.remove("validation");
    //     (document.getElementById('phoneno_id') as HTMLFormElement).classList.remove("validation");
    //   }

    }
  // }

    displaydata(){

      let usertype_id = (<HTMLInputElement>document.getElementById("usertype_id")).value;

      if(usertype_id == 'VENDOR'){

        (<HTMLInputElement>document.getElementById("display_startdata")).style.display ="block";
        (<HTMLInputElement>document.getElementById("display_enddata")).style.display ="block";

      }
      else if(usertype_id == 'EMPLOY'){
        (<HTMLInputElement>document.getElementById("display_startdata")).style.display ="block";
        (<HTMLInputElement>document.getElementById("display_enddata")).style.display ="none";
      }

    }

    gejobtitledata(){

      console.log('in');
      // alert('in');
      this.http.get(config_url+'/employee/selectJobTitle').subscribe( (data:any) => {
          // this.jobtitle=data;
          // this.jobdetail=this.jobtitle.data.JobTitle;
          this.jobdetail=data.JobTitle;

    });
    }

    getemployeedata(){

      console.log('in');
      // alert('in');
      this.http.get(config_url+'/employee/selectEmployeeType').subscribe(
        (data: any) => {
          this.employeetype=data;
          this.employeedetail=data.EmployeeDetails;
     });
    }

    getusertypedata(){

      console.log('in');

      this.http.get(config_url+'/app/selectUserType').subscribe(
        (data:any) => {

          this.usertypedata=data.UserTypeDetails;

    });
    }

  getbeclassificationdata(){
        console.log("in");
        // alert('in');
        this.http.get(config_url+'/app/selectBEClassification').subscribe(
          (data: any) => {


            this.beclassificationdetail = data.BEClassification
            // console.log("country",countrydata)
      });
      }


      Getallzipcode_list(){
          // alert('in');
        this.http.get(config_url+'/app/getZipCode').subscribe(
          (data: any) => {

          //  console.log(allzipcodelist);


             this.zipcodedetail=data.zipcodedata;
            //  console.log(this.cityalldetail)

          });

      }

       Getcityall_list(){

        console.log('in');
        this.http.get(config_url+'/app/selectAllcity').subscribe(
              (data: any) => {
              //  console.log( 'citylist', citylist);


                 this.cityalldetail=data.citydetails;
                //  console.log(this.cityalldetail)

              });

      }

      // onchangecitybyzip(){
      //   let zipid = (<HTMLInputElement>document.getElementById("regcurrentzip_id")).value;

      //   this.http.get(config_url+'/app/getCityByZipcode?zipcode='+zipid).subscribe(zip1 =>
      //     {

      //       this.zip2=zip1;
      //       this.cityalldetail=this.zip2.data.citydata;
      //       })

      // }

      onchangezip(){

        let cityid = (<HTMLInputElement>document.getElementById("currentcity_id")).value;

        this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe((data: any) =>
          {


            this.zipcodedetail=data.zipcodedata;
           })

      }

      onchangestate(){

        let cityid = (<HTMLInputElement>document.getElementById("currentcity_id")).value;

        this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe((data: any) =>
          {


            this.statetype=data.Statelist;
           })

      }

      onchangecountry(){

        let state_id = (<HTMLInputElement>document.getElementById("curstate_id")).value;

        this.http.get(config_url+'/app/getCountryByState?stateid='+state_id).subscribe((data: any) =>
          {

            this.countrydetail = data.countrydata
          })


      }



    removepassvalidation(){
     // (document.getElementById('passvalidationid') as HTMLFormElement).innerText = "";
    }


    get f() { return this.employeeform.controls; }

    onSubmit() {
      // debugger
        this.submitted = true;
        let usertype_id = (<HTMLInputElement>document.getElementById("usertype_id")).value;
        if(usertype_id == "EMPLOY")
        {

        if (this.employeeform.invalid)
        {
            return;
        }
        else
        {

          this.employeeform.value.UserTypeId="EMPLOY"
          alert(JSON.stringify(this.employeeform.value))
          this.finalsavecall(this.employeeform.value)
        }
        }
        else if(usertype_id == "OTHER")
        {

        if (this.otherform.invalid)
        {
            return;
        }
        else
        {
          this.otherform.value.UserTypeId="EMPLOY"
          alert(JSON.stringify(this.otherform.value))
          this.finalsavecall(this.otherform.value)

        }
        }
        else if(usertype_id == "VENDOR")
        {


         // let active1 = (<HTMLInputElement>document.getElementById("active")).checked;

          if(this.vendortype == true)
          {
            if (this.vendorform_business.invalid)
            {
                return;
            }
            else
            {
              this.vendorform_business.value.UserTypeId="VENDOR";
              this.vendorform_business.value.VendorTypeId=true;
              var int_business=parseInt(this.vendorform_business.value.BusinessSize)
              this.vendorform_business.value.BusinessSize=int_business;
              alert(JSON.stringify(this.vendorform_business.value))
              this.finalsavecall(this.vendorform_business.value)

            }
          }
          else
          {
            if (this.vendorform_individual.invalid)
            {
                return;
            }
            else
            {
              this.vendorform_individual.value.UserTypeId="VENDOR"
              this.vendorform_individual.value.VendorTypeId=false;
              var int_business=parseInt(this.vendorform_individual.value.BusinessSize)
              this.vendorform_individual.value.BusinessSize=int_business;
              alert(JSON.stringify(this.vendorform_individual.value))
              this.finalsavecall(this.vendorform_individual.value)

            }

          }


       }


    }
    finalsavecall(value : any)
    {
    try
    {
      // debugger
      this.registerapicall(value);
      // this.registerapicall(value).subscribe((resp) => {
      //   if (resp && resp.success == 1) {
      //    // this.ResetRegisterForm();

      //   }
      //   else {

      //   }
      // },
      //   (error) => {
      //         console.log(error)
      //   });

      // this.http.post("http://localhost:8080/"+'vendor/AdduserDetails', value).subscribe(

      //   data => {
      //     console.log("data");
      //       console.log('POST Request is successful >>>>>>>>', data);

      //   },
      //   success => {
      //     console.log("success");
      //     Swal.fire({
      //       position: 'top',
      //       icon: 'success',
      //       title: 'Successfully Registered',
      //       showConfirmButton: false,
      //       timer: 3000
      //     })
      //   }
      // );
    }
    catch(e)
    {
      console.log(e);
    }
    }

    registerapicall(data:any) {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     responseType:'text'

      //   })
      // };
      this.http.post<any>("http://localhost/MNC_PHP_API/vendor/AdduserDetails", data).subscribe({
        next: data => {
          console.error('There was an data!', data);
          console.log("errorcode",data.ErrorCodeID);
          console.log(data.length);
          if(data != null && data.length >0)
          {


            var errorcode=data[0].ErrorCodeID;

            if(errorcode=="9999")
            {

              Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Successfully Registered',
                showConfirmButton: false,
                timer: 3000
              });
            }
            else if(errorcode=="9998")
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Same User Id Already Exist!',

              })
            }
            else
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

              })
            }

          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',

            })
          }

        },
        error: error => {

            console.error('There was an error!', error);
        }
    })

    }
}

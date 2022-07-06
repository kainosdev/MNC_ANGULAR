import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';


@Component({
  selector: 'app-vendormanagement',
  templateUrl: './vendormanagement.component.html',
  styleUrls: ['./vendormanagement.component.scss'],
 
})
export class VendormanagementComponent implements OnInit {
  [x: string]: any;
  Vendortypevalue:any;
  classList: any;
  nextElementSibling: any;
  citylist:any;
  zipcodeVal:any;
  countrytype:any;
  districts:any;
  opened = false;
  opened2 = false;
  opened3 = false;
  date:any;
  vendorMgmt: any;
  contactindividual: any;
  generalinformation: any;
  currentaddress: any;
  mailingaddress: any;
  Pastaddress: any;
  ContactBusiness: any;
  addtionalcontact: any;
  citytype: any;
  citydata: any
  statelistdata: any;
  mail: any;
  singleVendorDet: any;
  singleVendorAddressDet:any;
  statedetail:any;
  current_date: any;
  from_date: any;
  constructor(
    private frmbuilder: FormBuilder,private http: HttpClient
  ) { }

  ngOnInit(): void {
    
    let vendoridSes = localStorage.getItem('vendoridSes');
    console.log(vendoridSes);
  //  this.getstate_list();
    this.GetVendorById();
    this.GetVendorAddressById();
    this.Getcityall_list();
    this.getAllZipcodes();
    this.getcountrydata();
    this.getAllDistricts();
    this.getstatedata();
    this.vendorMgmt = this.frmbuilder.group({
VendorId:[localStorage.getItem('vendoridSes')],
CreatedUserId:[localStorage.getItem("CreatedUseridses")],
    UserName :[],
      // active: [],
      VendorTypeId:[],
      FirstName: [],
      LastName: [],
      MiddleName: [],
      EIN_SSN: [],
      Email: [],
      Phone:[],
      OutreachEmailOptIn:[],
      AliasName:[],
      LegalName: [],
      Federal:[],
      NAICSCodes: [],
      CommodityCodes:[],
      BusinessRegisteredInDistrict:[],
      BusinessRegisteredInSCC:[],
      BusinessIsFranchisee:[],
      TradeName: [],
      DUNS: [],
      Website:[],
      StartDate:[],
      EndDate:[],
      Address1:[],
      Address2: [],
      StateId: [],
      CityId: [],
      Zipcode: [],
      DistrictId: [],
      CountryId: [],
      MAddress1: [],
      MAddress2: [],
      MStateId: [],
      MCityId: [],
      MZipcode: [],
      MDistrictId: [],
      MCountryId:[],
      MStartDate: [],
      MEndDate:[],
      PAddress1: [],
      PAddress2: [],
      PStateId: [],
      PCItyId: [],
      PZipcode: [],
      PDistrictId: [],
      PCountryId: [],
      PStartDate: [],
      PEndDate:[],
      ContactName: [],
      BusinessPhone: [],
      Title: [],
      BusinessEmail: [],
      ContactActive:[],
      AddtionalName: [],
      AddtionalTitle: [],
      AddtionalBusinessMail: [],
      AddtionalBusinessPhone: [],
      VendorContactPrimary:[],
      VendorContactActive:[],
      AddtionalContactActive:[],
      
     })

   
   
  }
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  phoneformat= /^[0-9]{10}$/;
  socialno = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;




  alpha(event: any){
    var inp = String.fromCharCode(event.keyCode);
  
  if (/[a-zA-Z]/.test(inp) || event.keyCode==32) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
  }
  alphanumeric(event: any){
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
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
  
  
  

  is_business:any = "individual";

 
//  ssnformat = /^ [0-9] {3}-? [0-9] {2}-? [0-9] {4}$/;


  Userdata(vendorMgmt:any){

    console.log('alldata',vendorMgmt);

    alert('calling');
    this.http.post('http://localhost/MNC_PHP_API/vendor/UpdateVendor',vendorMgmt).subscribe(
    // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(
      
      data => {
        console.log("data");
          console.log('POST Request is successful >>>>>>>>', data);

      },
      success => {});

    // console.log('contactindividual>>>', contactindividual);

     if(this.is_business == 'individual'){


      
       let FirstName = this.vendorMgmt.get('FirstName').value;
       let LastName = this.vendorMgmt.get('LastName').value;
       let EIN_SSN = this.vendorMgmt.get('EIN_SSN').value;
       let Email = this.vendorMgmt.get('Email').value;
       let Phone =this.vendorMgmt.get('Phone').value;

       



       let Address1 =this.vendorMgmt.get('Address1').value;
       let Address2 =this.vendorMgmt.get('Address2').value;
       let StateId =this.vendorMgmt.get('StateId').value;
       let CityId= this.vendorMgmt.get('CityId').value;
       let Zipcode =this.vendorMgmt.get('Zipcode').value;
       let DistrictId =this.vendorMgmt.get('DistrictId').value;
       let CountryId =this.vendorMgmt.get('CountryId').value;

       if(FirstName == null){
        (document.getElementById('firstname_id') as HTMLFormElement).classList.add("validation");
       }
       if(LastName == null ){
        (document.getElementById('lastname_id') as HTMLFormElement).classList.add("validation");
       }
       if(EIN_SSN == null ){
        (document.getElementById('socialsecurity_id') as HTMLFormElement).classList.add("validation");
       }
       if(Email == null ){
        (document.getElementById('email_id') as HTMLFormElement).classList.add("validation");
       }
       if(Phone == null ){
        (document.getElementById('phone_id') as HTMLFormElement).classList.add("validation");
       }
       if(Address1 == null  ){
        (document.getElementById('currentaddress_id') as HTMLFormElement).classList.add("validation");
       }
       if(Address2 == null){
        (document.getElementById('currentstreet_id') as HTMLFormElement).classList.add("validation");
       }
       if(StateId == null){
        (document.getElementById('stateprovice_id') as HTMLFormElement).classList.add("validation");
       }
       if(CityId == null){
        (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
       }
       if(Zipcode== null){
        (document.getElementById('currentzipcode_id') as HTMLFormElement).classList.add("validation");
       }
       if(DistrictId == null){
        (document.getElementById('currentcounty_id' ) as HTMLFormElement).classList.add("validation");
       }
       if(CountryId == null){
        (document.getElementById('currentcountry_id') as HTMLFormElement).classList.add("validation");
       }

       if(!Email.match(this.mailformat)){
        (document.getElementById('email_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('email_idmsg') as HTMLFormElement).innerHTML = "Enter valid email address";
    //   (document.getElementById('email_idmsg') as HTMLFormElement).focus();
    //  return;
  }
  if(!EIN_SSN.match(this.socialno)){
    (document.getElementById('socialsecurity_id') as HTMLFormElement).classList.add("validation");
}
if(!Phone.match(this.phoneformat)){
  (document.getElementById('phone_id') as HTMLFormElement).classList.add("validation");
}
}

  else{

    let LegalName = this.vendorMgmt.get('LegalName').value;
    let NAICSCodes=this.vendorMgmt.get('NAICSCodes').value;
    // alert(naicscode);
    let CommodityCodes=this.vendorMgmt.get('CommodityCodes').value;
    // alert(commoditycode);
    let federal = this.vendorMgmt.get('federal').value;
    let TradeName = this. vendorMgmt.get('TradeName').value;
    let DUNS = this.vendorMgmt.get('DUNS').value;
    let Website = this.vendorMgmt.get('Website').value;

      let Address1 =this.vendorMgmt.get('Address1').value;
       let Address2 =this.vendorMgmt.get('Address2').value;
       let StateId =this.vendorMgmt.get('StateId').value;
       let CityId= this.vendorMgmt.get('CityId:').value;
       let  Zipcode =this.vendorMgmt.get(' Zipcode').value;
       let DistrictId =this.vendorMgmt.get('DistrictId').value;
       let CountryId =this.vendorMgmt.get('CountryId').value;


    let ContactName = this.vendorMgmt.get('ContactName').value;
    let BusinessPhone = this.vendorMgmt.get('BusinessPhone').value;
    let Title= this.vendorMgmt.get('Title').value;
    let BusinessEmail = this.vendorMgmt.get('BusinessEmail').value;


if(LegalName == null){
  (document.getElementById('legalbusiness_id') as HTMLFormElement).classList.add("validation");
}
if(federal == null){
  (document.getElementById('federal_id') as HTMLFormElement).classList.add("validation");
}
if(TradeName == null){
  (document.getElementById('tradename_id') as HTMLFormElement).classList.add("validation");
}
if(DUNS == null){
  (document.getElementById('dunsno_id') as HTMLFormElement).classList.add("validation");
}
if(Website == null){
  (document.getElementById('businesswebsite_id') as HTMLFormElement).classList.add("validation");
}
if(Address1 == null  ){
  (document.getElementById('currentaddress_id') as HTMLFormElement).classList.add("validation");
 }
 if(Address2 == null){
  (document.getElementById('currentstreet_id') as HTMLFormElement).classList.add("validation");
 }
 if(StateId == null){
  (document.getElementById('stateprovice_id') as HTMLFormElement).classList.add("validation");
 }
 if(CityId == null){
  (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
 }
 if( Zipcode == null){
  (document.getElementById('currentzipcode_id') as HTMLFormElement).classList.add("validation");
 }
 if(DistrictId == null){
  (document.getElementById('currentcounty_id' ) as HTMLFormElement).classList.add("validation");
 }
 if(CountryId == null){
  (document.getElementById('currentcountry_id') as HTMLFormElement).classList.add("validation");
 }
 if(ContactName==null){
  (document.getElementById('contactperson_id') as HTMLFormElement).classList.add("validation");
 }
 if(BusinessPhone ==  null){
  (document.getElementById('businessphone_id') as HTMLFormElement).classList.add("validation");
 }
 if(Title == null){
  (document.getElementById('title_id') as HTMLFormElement).classList.add("validation");
 }
 if(BusinessEmail == null){
  (document.getElementById('businessemail_id') as HTMLFormElement).classList.add("validation");
 }


    //  if(Legal_business == null && federal == null && trade_name == null  && duns_no == null && business_website == null &&
    //   physical_address == null  && street == null && state_province == null && city == null && zip_code == null && county == null && country == null &&
    //   contact_name == null && business_phone ==  null && title == null  && business_email == null ){


        
    //   (document.getElementById('legalbusiness_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('federal_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('tradename_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('dunsno_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('businesswebsite_id') as HTMLFormElement).classList.add("validation");

    //   (document.getElementById('currentaddress_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('currentstreet_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('stateprovice_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('currentzipcode_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('currentcounty_id' ) as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('currentcountry_id') as HTMLFormElement).classList.add("validation");


    //    (document.getElementById('contactperson_id') as HTMLFormElement).classList.add("validation");
    //    (document.getElementById('businessphone_id') as HTMLFormElement).classList.add("validation");
    //    (document.getElementById('title_id') as HTMLFormElement).classList.add("validation");
    //    (document.getElementById('businessemail_id') as HTMLFormElement).classList.add("validation");
   
   
    //   }


  }
  
 

 }

EmptyErrorMessage(errormessage: any) {

  (document.getElementById(errormessage) as HTMLFormElement).classList.remove("validation");

  }

  // EmptyErrorMessage1(email_idmsg: any) {

  //   (document.getElementById(email_idmsg) as HTMLFormElement).innerHTML = "";
  
  //   }

 
 

  
Displayvendortype(){
  alert(this.Vendortypevalue);

  let vendor_details = (<HTMLInputElement>document.getElementById("active")).checked;
  // alert(vendor_details);
 if(vendor_details == true){
  // alert("in");
  this.Vendortypevalue='B';
// this.is_business = 'business';

//      (<HTMLInputElement>document.getElementById("General_Information")).style.display ="block";
//     (<HTMLInputElement>document.getElementById("currentaddress")).style.display ="block";
//     (<HTMLInputElement>document.getElementById("addtionaddress")).style.display ="block";
//     (<HTMLInputElement>document.getElementById("contact_inforation")).style.display ="block";
//     (<HTMLInputElement>document.getElementById("vendor-individual")).style.display ="none";
    
  }
  else{
    this.Vendortypevalue='I';
 
    // this.is_business = 'individual';
    // (<HTMLInputElement>document.getElementById("vendor-individual")).style.display ="block";
    // (<HTMLInputElement>document.getElementById("currentaddress")).style.display ="block";
    // (<HTMLInputElement>document.getElementById("addtionaddress")).style.display ="block";
    // (<HTMLInputElement>document.getElementById("contact_inforation")).style.display ="none";
    // (<HTMLInputElement>document.getElementById("General_Information")).style.display ="none";
    
  }

}

display_addresstype(addresstype:any){
  // addressheading
  if(addresstype == "mail"){
   
    (<HTMLInputElement>document.getElementById("mailing_type")).style.display ="block";
    (<HTMLInputElement>document.getElementById("past_type")).style.display ="none";

  }
  else {
   
    (<HTMLInputElement>document.getElementById("past_type")).style.display ="block";
    (<HTMLInputElement>document.getElementById("mailing_type")).style.display ="none";
  }
  
}
 
Address_swiping(){

      let address_type = (<HTMLInputElement>document.getElementById("address_active")).checked;
      if(address_type == true){

        this.vendorMgmt.controls.mailing_address.setValue(this.currentaddress.get('physical_address').value); 
        this.vendorMgmt.controls.mailing_street.setValue(this.currentaddress.get('street').value);
        this.vendorMgmt.controls.state_province1.setValue(this.currentaddress.get('state_province').value);
        this.vendorMgmt.controls.city_1.setValue(this.currentaddress.get('city').value);
        this.vendorMgmt.controls.zip_code1.setValue(this.currentaddress.get('zip_code').value);
        this.vendorMgmt.controls.county_1.setValue(this.currentaddress.get('county').value);
        this.vendorMgmt.controls.country_1.setValue(this.currentaddress.get('country').value);

 }
 else{

  this.vendorMgmt.controls.mailing_address.setValue(""); 
  this.vendorMgmt.controls.mailing_street.setValue("");
  this.vendorMgmt.controls.state_province1.setValue("");
  this.vendorMgmt.controls.city_1.setValue("");
  this.vendorMgmt.controls.zip_code1.setValue("");
  this.vendorMgmt.controls.county_1.setValue("");
  this.vendorMgmt.controls.country_1.setValue("");
 }
}


GetVendorById(){
 
  let vendoridSes = localStorage.getItem('vendoridSes');

  this.http.get(config_url+'/vendor/GetVendorById?VendorId='+vendoridSes).subscribe(data1 =>
    {

      console.log("data2>>>",data1);
      this.singleVendorDet=data1;
      this.singleVendorDet=this.singleVendorDet.data.SingleVendorDetails;
      this.Vendortypevalue=this.singleVendorDet[0].VendorTypeId;
      // alert(this.Vendortypevalue);
  
      // console.log( 'singleVendorDet', this.singleVendorDet);
      // alert(this.singleVendorDet[0]["VendorTypeId"]);
      // if(this.singleVendorDet[0]["VendorTypeId"] == "B") {
      //   // alert("in")
      //   this.is_business = 'business';
      //   (<HTMLInputElement>document.getElementById("active")).checked = true;
      //   this.Displayvendortype();
      // }
      // else {
      //   this.is_business = 'individual';
      //   (<HTMLInputElement>document.getElementById("active")).checked = false;
      //   // this.Displayvendortype();
      // }
      // console.log(this.singleVendorDet[0].OutreachEmailOptIn)
    })

}

GetVendorAddressById(){

  let vendoridSes = localStorage.getItem('vendoridSes');
  // let vendoridSes = "BC75E529-1F26-4993-9469-2797493CD645";
  this.http.get(config_url+'/vendor/GetVendorAddressById?VendorId='+vendoridSes).subscribe(data1 =>
    {

      console.log(data1);
      this.singleVendorAddressDet=data1;
      this.singleVendorAddressDet=this.singleVendorAddressDet.data.SingleVendorAddressDetails;

      this.singleVendorAddressDet[0].StartDate = this.singleVendorAddressDet[0].StartDate.split(" ")[0];

      this.singleVendorAddressDet[0].EndDate = this.singleVendorAddressDet[0].EndDate.split(" ")[0];   
      console.log( 'singleVendorAddressDet', this.singleVendorAddressDet[0]);
      console.log(this.StartDate);
      
      
    })

}
  StartDate(StartDate: any) {
    throw new Error('Method not implemented.');
  }

Getcityall_list(){

  console.log('in');
  // alert('in');

  this.http.get(config_url+'/app/selectAllcity').subscribe(
        (citylist: {}) => {
        //  console.log( 'citylist', citylist);

          this.citylist=citylist;
           this.citylist=this.citylist.data.citydetails;
          //  console.log(this.citylist)

        });

}

getAllZipcodes(){
     
  console.log('in');
  // alert('in');
  this.http.get(config_url+'/app/getZipCode').subscribe( (data: {}) => {
      this.zipcodeVal=data;
      this.zipcodeVal=this.zipcodeVal.data.zipcodedata;
        // console.log(this.zipcodeVal);
});
}

getcountrydata(){
  this.http.get(config_url+'/app/selectAllCountry').subscribe(
    (countrydata: {}) => {
     
      this.countrytype = countrydata;
      this.countrytype = this.countrytype.data.CountryDetails
      // console.log("country",countrydata)
});
}

getAllDistricts(){
  this.http.get(config_url+'/app/selectAllDistricts').subscribe(
    (data: {}) => {
     
      this.districts = data;
      this.districts = this.districts.data.selectAllDistricts
      // console.log("districts",this.districts);
});
}

getstatedata(){
 
  this.http.get(config_url+'/app/selectAllState').subscribe(
    (statelistdata: {}) => {
     
      this.statedetail = statelistdata;
      this.statedetail = this.statedetail.data.statedetails;
      console.log("state",this.statedetail)
});
}

}

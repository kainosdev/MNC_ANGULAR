import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
@Component({
  selector: 'app-vendormanagement',
  templateUrl: './vendormanagement.component.html',
  styleUrls: ['./vendormanagement.component.scss']
})
export class VendormanagementComponent implements OnInit {
  classList: any;
  nextElementSibling: any;
  citylist:any;
  zipcodeVal:any;
  countrytype:any;
  districts:any;
  opened = false;
  opened2 = false;
  opened3 = false;
  
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

      user_name :[],
      active: [],
      first_name: [],
      last_name: [],
      middle_name: [],
      social_no: [],
      email_individual: [],
      phone_no:[],
      alias_name:[],
       business_name: [],
      federal:[],
      naicscode: [],
      commoditycode:[],
      trade_name: [],
      duns_no: [],
      business_website:[],
      physical_address:[],
      street: [],
      state_province: [],
      city: [],
      zip_code: [],
      county: [],
      country: [],
      mailing_address: [],
      mailing_street: [],
      state_province1: [],
      city_1: [],
      zip_code1: [],
      county_1: [],
      country_1:[],
      mailingfrom_date: [],
      mailingto_date:[],
      past_address: [],
      past_street: [],
      state_province2: [],
      city_2: [],
      zip_code2: [],
      county_2: [],
      country_2: [],
      pastfrom_date: [],
      pastto_date: [],
      contact_name: [],
      business_phone: [],
      title: [],
      business_email: [],
      addtional_name: [],
      addtional_title: [],
      addtional_businessmail: [],
      addtional_businessphone: [],
      VendorContactPrimary:[],
      VendorContactActive:[]
     })

    // this.contactindividual = this.frmbuilder.group({
    //   first_name: [],
    //   last_name: [],
    //   middle_name: [],
    //   social_no: [],
    //   email_individual: [],
    //   phone_no:[],
    //  })

    // this.generalinformation = this.frmbuilder.group({
    //   alias_name:[],
    //    business_name: [],
    //   federal:[],
    //   naicscode: [],
    //   commoditycode:[],
    //   trade_name: [],
    //   duns_no: [],
    //   business_website:[],
    //  })

    //  this.currentaddress = this.frmbuilder.group({
    //   physical_address:[],
    //   street: [],
    //   state_province: [],
    //   city: [],
    //   zip_code: [],
    //   county: [],
    //   country: [],

    //  })

    //  this.mailingaddress = this.frmbuilder.group({
    //   mailing_address: [],
    //   mailing_street: [],
    //   state_province1: [],
    //   city_1: [],
    //   zip_code1: [],
    //   county_1: [],
    //   country_1:[],
    //   mailingfrom_date: [],
    //   mailingto_date:[],

    //  })

    //  this.Pastaddress = this.frmbuilder.group({

    //   past_address: [],
    //   past_street: [],
    //   state_province2: [],
    //   city_2: [],
    //   zip_code2: [],
    //   county_2: [],
    //   country_2: [],
    //   pastfrom_date: [],
    //   pastto_date: [],

    //  })

    //  this.ContactBusiness = this.frmbuilder.group({

    //   contact_name: [],
    //   business_phone: [],
    //   title: [],
    //   business_email: [],
    //   addtional_name: [],
    //   addtional_title: [],
    //   addtional_businessmail: [],
    //   addtional_businessphone: [],
    //   VendorContactPrimary:[],
    //   VendorContactActive:[]
    //  })

   
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

    // console.log('contactindividual>>>', contactindividual);

     if(this.is_business == 'individual'){


      
       let first_name = this.vendorMgmt.get('first_name').value;
       let last_name = this.vendorMgmt.get('last_name').value;
       let social_no = this.vendorMgmt.get('social_no').value;
       let email_individual = this.vendorMgmt.get('email_individual').value;
       let phone_no =this.vendorMgmt.get('phone_no').value;

       



       let physical_address =this.vendorMgmt.get('physical_address').value;
       let street =this.vendorMgmt.get('street').value;
       let state_province =this.vendorMgmt.get('state_province').value;
       let city= this.vendorMgmt.get('city').value;
       let zip_code =this.vendorMgmt.get('zip_code').value;
       let county =this.vendorMgmt.get('county').value;
       let country =this.vendorMgmt.get('country').value;

       if(first_name == null){
        (document.getElementById('firstname_id') as HTMLFormElement).classList.add("validation");
       }
       if(last_name == null ){
        (document.getElementById('lastname_id') as HTMLFormElement).classList.add("validation");
       }
       if(social_no == null ){
        (document.getElementById('socialsecurity_id') as HTMLFormElement).classList.add("validation");
       }
       if(email_individual == null ){
        (document.getElementById('email_id') as HTMLFormElement).classList.add("validation");
       }
       if(phone_no == null ){
        (document.getElementById('phone_id') as HTMLFormElement).classList.add("validation");
       }
       if(physical_address == null  ){
        (document.getElementById('currentaddress_id') as HTMLFormElement).classList.add("validation");
       }
       if(street == null){
        (document.getElementById('currentstreet_id') as HTMLFormElement).classList.add("validation");
       }
       if(state_province == null){
        (document.getElementById('stateprovice_id') as HTMLFormElement).classList.add("validation");
       }
       if(city == null){
        (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
       }
       if(zip_code == null){
        (document.getElementById('currentzipcode_id') as HTMLFormElement).classList.add("validation");
       }
       if(county == null){
        (document.getElementById('currentcounty_id' ) as HTMLFormElement).classList.add("validation");
       }
       if(country == null){
        (document.getElementById('currentcountry_id') as HTMLFormElement).classList.add("validation");
       }

       if(!email_individual.match(this.mailformat)){
        (document.getElementById('email_id') as HTMLFormElement).classList.add("validation");
    //   (document.getElementById('email_idmsg') as HTMLFormElement).innerHTML = "Enter valid email address";
    //   (document.getElementById('email_idmsg') as HTMLFormElement).focus();
    //  return;
  }
  if(!social_no.match(this.socialno)){
    (document.getElementById('socialsecurity_id') as HTMLFormElement).classList.add("validation");
}
if(!phone_no.match(this.phoneformat)){
  (document.getElementById('phone_id') as HTMLFormElement).classList.add("validation");
}
}

  else{

    let Legal_business = this.vendorMgmt.get('business_name').value;
    let naicscode=this.vendorMgmt.get('naicscode').value;
    // alert(naicscode);
    let commoditycode=this.vendorMgmt.get('commoditycode').value;
    // alert(commoditycode);
    let federal = this.vendorMgmt.get('federal').value;
    let trade_name = this. vendorMgmt.get('trade_name').value;
    let duns_no = this.vendorMgmt.get('duns_no').value;
    let business_website = this.vendorMgmt.get('business_website').value;

      let physical_address =this.vendorMgmt.get('physical_address').value;
       let street =this.vendorMgmt.get('street').value;
       let state_province =this.vendorMgmt.get('state_province').value;
       let city= this.vendorMgmt.get('city').value;
       let zip_code =this.vendorMgmt.get('zip_code').value;
       let county =this.vendorMgmt.get('county').value;
       let country =this.vendorMgmt.get('country').value;


    let contact_name = this.vendorMgmt.get('contact_name').value;
    let business_phone = this.vendorMgmt.get('business_phone').value;
    let title= this.vendorMgmt.get('title').value;
    let business_email = this.vendorMgmt.get('business_email').value;


if(Legal_business == null){
  (document.getElementById('legalbusiness_id') as HTMLFormElement).classList.add("validation");
}
if(federal == null){
  (document.getElementById('federal_id') as HTMLFormElement).classList.add("validation");
}
if(trade_name == null){
  (document.getElementById('tradename_id') as HTMLFormElement).classList.add("validation");
}
if(duns_no == null){
  (document.getElementById('dunsno_id') as HTMLFormElement).classList.add("validation");
}
if(business_website == null){
  (document.getElementById('businesswebsite_id') as HTMLFormElement).classList.add("validation");
}
if(physical_address == null  ){
  (document.getElementById('currentaddress_id') as HTMLFormElement).classList.add("validation");
 }
 if(street == null){
  (document.getElementById('currentstreet_id') as HTMLFormElement).classList.add("validation");
 }
 if(state_province == null){
  (document.getElementById('stateprovice_id') as HTMLFormElement).classList.add("validation");
 }
 if(city == null){
  (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
 }
 if(zip_code == null){
  (document.getElementById('currentzipcode_id') as HTMLFormElement).classList.add("validation");
 }
 if(county == null){
  (document.getElementById('currentcounty_id' ) as HTMLFormElement).classList.add("validation");
 }
 if(country == null){
  (document.getElementById('currentcountry_id') as HTMLFormElement).classList.add("validation");
 }
 if(contact_name==null){
  (document.getElementById('contactperson_id') as HTMLFormElement).classList.add("validation");
 }
 if(business_phone ==  null){
  (document.getElementById('businessphone_id') as HTMLFormElement).classList.add("validation");
 }
 if(title == null){
  (document.getElementById('title_id') as HTMLFormElement).classList.add("validation");
 }
 if(business_email == null){
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

  let vendor_details = (<HTMLInputElement>document.getElementById("active")).checked;
  // alert(vendor_details);
 if(vendor_details == true){
  // alert("in");
this.is_business = 'business';

     (<HTMLInputElement>document.getElementById("General_Information")).style.display ="block";
    (<HTMLInputElement>document.getElementById("currentaddress")).style.display ="block";
    (<HTMLInputElement>document.getElementById("addtionaddress")).style.display ="block";
    (<HTMLInputElement>document.getElementById("contact_inforation")).style.display ="block";
    (<HTMLInputElement>document.getElementById("vendor-individual")).style.display ="none";
    
  }
  else{

 
    this.is_business = 'individual';
    (<HTMLInputElement>document.getElementById("vendor-individual")).style.display ="block";
    (<HTMLInputElement>document.getElementById("currentaddress")).style.display ="block";
    (<HTMLInputElement>document.getElementById("addtionaddress")).style.display ="block";
    (<HTMLInputElement>document.getElementById("contact_inforation")).style.display ="none";
    (<HTMLInputElement>document.getElementById("General_Information")).style.display ="none";
    
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
  // alert("hi");
  let vendoridSes = localStorage.getItem('vendoridSes');

  this.http.get(config_url+'/vendor/GetVendorById?VendorId='+vendoridSes).subscribe(data1 =>
    {

      console.log(data1);
      this.singleVendorDet=data1;
      this.singleVendorDet=this.singleVendorDet.data.SingleVendorDetails;
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
    })

}

GetVendorAddressById(){
//  alert("hi");
  // let vendoridSes = localStorage.getItem('vendoridSes');
  let vendoridSes = "BC75E529-1F26-4993-9469-2797493CD645";
  this.http.get(config_url+'/vendor/GetVendorAddressById?VendorId='+vendoridSes).subscribe(data1 =>
    {

      console.log(data1);
      this.singleVendorAddressDet=data1;
      this.singleVendorAddressDet=this.singleVendorAddressDet.data.SingleVendorAddressDetails;
      console.log( 'singleVendorAddressDet', this.singleVendorAddressDet);
      
      
    })

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

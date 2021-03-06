import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendormanagement',
  templateUrl: './vendormanagement.component.html',
  styleUrls: ['./vendormanagement.component.scss'],
 
})
export class VendormanagementComponent implements OnInit {
  public mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mask1 = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  // public mask1 = ['+',/\d/,'(',/\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  globalStateid:any;

  statedetailMailAddr:any;
  zipcodeValMailAddr:any;
  countrytypeMailAddr:any;

  countrytypePastAddr:any;
  zipcodeValPastAddr:any;
  statedetailPastAddr:any;

  SingleVendorContactDetailsArr:any;

  CurrentAddrStartDate:any;
  CurrentAddrEndDate:any;
  MailAddrStartDate:any;
  MailAddrEndDate:any;
  PastAddrStartDate:any;
  PastAddrEndDate:any;
  PastAddressDetails:any=[];
  CurrentAddressDetails:any=[];
  MailingAddressDetails:any=[];
  submitted = false;
  submitted1 = false;
  submitted2 = false;
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
  VendorMgmtBusiness: any;
  VendorMgmtIndividual:any;
  contactindividual: any;
  generalinformation: any;
  currentaddress: any;
  mailingaddress: any;
  Pastaddress: any;
  // Contactlist: FormArray;
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

  IndBusinessPastDistricts:any;
  IndBusinessPastCountry:any;
  IndBusinessPastZipcode:any;
  IndBusinessPastCity:any;
  IndBusinessPastState:any;

  IndBusinessDistrictsNew:any;
  IndBusinessCountryNew:any;
  IndBusinessZipcodeNew:any;
  IndBusinessCityNew:any;
  IndBusinessStateNew:any;


  // final
  indBusMailAddressCityFinal:any;
  indBusMailAddressZipcodeFinal:any;
  indBusMailAddressDistrictFinal:any;
  indBusMailAddressStateFinal:any;
  indBusMailAddressCountryFinal:any;



  indBusPastAddressCityFinal:any;
  indBusPastAddressZipcodeFinal:any;
  indBusPastAddressDistrictFinal:any;
  indBusPastAddressStateFinal:any;
  indBusPastAddressCountryFinal:any;


  contactsform: FormGroup;
  contactList?: FormArray;
  vehicleList?: FormArray;
  AdditionalContactList:any=[];
 
  ContactToggle : boolean[] = [];

  SingleVendorContactNotPrimary:any;

  constructor(
    private frmbuilder: FormBuilder,private http: HttpClient,
  ) { 
   
    this.contactsform = this.frmbuilder.group({
      contactarray: this.frmbuilder.array([
        this.createcontact()
      ])
    });
    this.contactList = this.contactsform.get('contactarray') as FormArray;
   
  }

  ngOnInit(): void {
    // debugger
    // this.contactsform = this.frmbuilder.group({
    //   contactarray: this.frmbuilder.array([this.createcontact()])
    // });
    this.contactList = this.contactsform.get('contactarray') as FormArray;
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
    this.GetVendorContactById();
    this.VendorMgmtBusiness = this.frmbuilder.group({
VendorId:[localStorage.getItem('vendoridSes')],
CreatedUserId:[localStorage.getItem("CreatedUseridses")],
    UserName :[],
      // active: [],
      VendorTypeId:[],
      //FirstName: ['', [Validators.required]],
      //LastName: ['', [Validators.required]],
      MiddleName: [],
      EIN_SSN: ['', [Validators.required]],
      Email: [],
      Phone:[],
      OutreachEmailOptIn:[],
      AliasName:[],
      LegalName: ['', [Validators.required]],
      Federal:[],
      NAICSCodes: [],
      CommodityCodes:[],
      BusinessRegisteredInDistrict:[],
      BusinessRegisteredInSCC:[],
      BusinessIsFranchisee:[],
      BusinessSize:[],
      TradeName: [],
      DUNS: [],
      Website:[],
      StartDate:['', [Validators.required]],
      EndDate:['', [Validators.required]],
      Address1:['', [Validators.required]],
      Address2: [],
      StateId: ['', [Validators.required]],
      CityId: ['', [Validators.required]],
      Zipcode: ['', [Validators.required]],
      DistrictId: [],
      CountryId: [],

      BMAddress1: [],
      BMAddress2: [],
      BMStateId1: [],
      BMCityId: [],
      BMZipcode1: [],
      BMDistrictId: [],
      BMCountryId:[],
      BMStartDate: [],
      BMEndDate:[],

      BPAddress1: [],
      BPAddress2: [],
      BPStateId: [1],
      BPCityId: [],
      BPZipcode: [],
      BPDistrictId: [],
      BPCountryId: [],
      BPStartDate: [],
      BPEndDate:[],
      
      ContactName: ['', [Validators.required]],
      BusinessPhone: ['', [Validators.required]],
      JobTitle: ['', [Validators.required]],
      BusinessEmail: ['', [Validators.required]],
      // ContactActive:[],
      VendorContactActive:[],
      VendorContactPrimary:[1],

      AddtionalName: [],
      AddtionalTitle: [],
      AddtionalBusinessMail: [],
      AddtionalBusinessPhone: [],
      
      //VendorContactActive:[],
      AddtionalContactActive:[],
      
     })

     this.VendorMgmtIndividual = this.frmbuilder.group({
      UserName :[],
      // active: [],
      VendorTypeId:[],
      VendorId:[localStorage.getItem('vendoridSes')],
      CreatedUserId:[localStorage.getItem("CreatedUseridses")],
      FirstName: ['', [Validators.required]],
      EIN_SSN: ['', [Validators.required]],
      LastName:['', [Validators.required]],
      Email:[],
      MiddleName:[],
      Phone:[],
      OutreachEmailOptIn:[],
      Address1:['', [Validators.required]],
      Address2:[],
      CityId:['', [Validators.required]], 
      CountryId:[],
      Zipcode:['', [Validators.required]],
      StartDate:['', [Validators.required]],
      EndDate:['', [Validators.required]],
      DistrictId:[],
      StateId:['', [Validators.required]],

      IMAddress1:[],
      IMAddress2:[],
      IMCityId:[],
      IMCountryId:[],
      IMZipcode:[],
      IMStartDate:[],
      IMDistrictId:[],
      IMEndDate:[],
      IMStateId:[],

      IPAddress1:[],
      IPAddress2:[],
      IPCityId:[],
      IPCountryId:[],
      IPZipcode:[],
      IPStartDate:[],
      IPDistrictId:[],
      IPEndDate:[],
      IPStateId:[],
     });

  //  this.setUserCategoryValidators();
  this.GetVendorContactByNotPrimary();
   
  }
  toggleContact(i:any) {
    if(this.ContactToggle[i]!=null)
    {
      this.ContactToggle[i] = !this.ContactToggle[i]; 
    }
     
  }
  removeContact(index:any,contactsform:any) {
    // console.log(this.ContactToggle);
    console.log(contactsform[index]);
    if(this.ContactToggle!=null)
    {
      this.ContactToggle.splice(index, 1);
    }
    if(this.contactList!=null)
    {
      this.contactList.removeAt(index);
    }

    // contactsform = contactsform.contactarray[index];
    contactsform.contactarray[index].VendorId = localStorage.getItem('vendoridSes');
    // contactsform.VendorId = "test";
    // console.log(contactsform.contactarray[index].VendorId);

    this.http.post('http://localhost/MNC_PHP_API/vendor/DeleteVendorContact',contactsform.contactarray[index]).subscribe(
    // // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(
      
      data => {
        console.log("data");
          console.log('POST Request is successful >>>>>>>>', data);

      },
      success => {
        // Swal.fire({
        //   position: 'top',
        //   icon: 'success',
        //   title: 'Successfully Registered',
        //   showConfirmButton: false,
        //   timer: 3000
        // })
      }
      );
   
  }


  createcontact1(ContactName:any,JobTitle:any,Email:any,Phone:any,VendorContactActive:any,ContactId:any): FormGroup {
    return this.frmbuilder.group({
      AddtionalName: [ContactName],
      AddtionalTitle: [JobTitle],
      AddtionalBusinessMail: [Email],
      AddtionalBusinessPhone: [Phone],
      AddtionalContactActive:[VendorContactActive],
      ContactId:[ContactId],
    });
  }

  createcontact(): FormGroup {
    return this.frmbuilder.group({
      AddtionalName: [
        //'', [Validators.required]
      ],
      AddtionalTitle: [],
      AddtionalBusinessMail: [],
      AddtionalBusinessPhone: [],
      AddtionalContactActive:[],
      ContactId:[0]
    });
  }

  addcontact() {
    // debugger
    if(this.contactList!=null)
    {
      
      //this.ContactToggle[i]=true;
      //this.toggleContact(i)
      this.contactList.push(this.createcontact());
     
    }

   
  }

  savecontact(i:any) {
    
      
      this.ContactToggle[i]=true;
      // console.log(this.contactList);
      //this.toggleContact(i)
     

  }

  get contactFormGroup() {
    return this.contactsform.get('contactarray') as FormArray;
  }
  get cfc() {
    return this.contactsform.controls;
  }
  setUserCategoryValidators() {
//     this.VendorMgmtIndividual.get("IMAddress1").clearValidators([Validators.required]);//clear validation
// this.VendorMgmtIndividual.get("IMAddress1").setErrors(null);//updating error message
// this.VendorMgmtIndividual.updateValueAndValidity();//update validation
    // alert("in");
    // let IMAddress1_ind = this.VendorMgmtIndividual.get('IMAddress1').value;
    // alert(IMAddress1_ind);
    // this.VendorMgmtIndividual.controls.IMAddress1.setValue= "";
    // this.VendorMgmtIndividual.controls["IMAddress1"].setValidators([Validators.required]);
    // this.VendorMgmtIndividual.get('IMAddress1').setValidators([Validators.required])
    // 
    // 
    

    // this.VendorMgmtIndividual.get('IMCityId').valueChanges
    //   .subscribe((IMCityId: any) => {

    //     if (IMCityId != null) {
    //       IMAddress1.setValidators([Validators.required]);
          
    //     }

        
    //   });
  }

  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  phoneformat= /^[0-9]{10}$/;
  socialno = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;

  


  // get rcf() {
  //   return this.vendorMgmt.controls;
  // }

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

VendorData(VendorMgmtIndividual:any){ 
// debugger;


// (<any>Object).values(VendorMgmtIndividual.controls).forEach((control: { markAsDirty: () => void; }) => {
//   control.markAsDirty();  // or control.markAsTouched();
// });

// this.VendorMgmtIndividual
// if(!this.VendorMgmtIndividual.dirty){

// // this.VendorMgmtIndividual.controls.forEach((element:any,i:any) => {
// //   if (element.value) 
// //   {
   
//     this.VendorMgmtIndividual.markAllAsTouched();
  

//   // }
// // });
// }

  this.submitted1 = true;
  console.log('VendorMgmtIndividual',VendorMgmtIndividual);
  // this.setUserCategoryValidators();
  this.http.post('http://localhost/MNC_PHP_API/vendor/UpdateVendor',VendorMgmtIndividual).subscribe(
    // // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(
      
      data => {
        console.log("data");
          console.log('POST Request is successful >>>>>>>>', data);

      },
      success => {
        // Swal.fire({
        //   position: 'top',
        //   icon: 'success',
        //   title: 'Successfully Registered',
        //   showConfirmButton: false,
        //   timer: 3000
        // })
      }
      );
}


  Userdata(vendorMgmt:any){
    // business
    this.submitted2 = true;

    console.log('alldata',vendorMgmt);
    if(this.contactList !=null)
    {
      this.AdditionalContactList=[]
      this.contactList.value.forEach((element: any) => {
     
        var addcontactData = {
          "AddtionalName": element.AddtionalName,
          "AddtionalTitle": element.AddtionalTitle,
          "AddtionalBusinessMail": element.AddtionalBusinessMail,
          "AddtionalBusinessPhone": element.AddtionalBusinessPhone,
          "AddtionalContactActive": element.AddtionalContactActive,
          "ContactId": element.ContactId
        };
  
        this.AdditionalContactList.push(addcontactData)
      });
      vendorMgmt.Newcontact = this.AdditionalContactList;
      console.log(vendorMgmt);
      //vendorMgmt.push(this.AdditionalContactList);
      
       //console.log(JSON.stringify(this.AdditionalContactList))
    }

    this.http.post('http://localhost/MNC_PHP_API/vendor/UpdateVendor',vendorMgmt).subscribe(
    // // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(
      
      data => {
        console.log("data");
          console.log('POST Request is successful >>>>>>>>', data);

      },
      success => {
        // Swal.fire({
        //   position: 'top',
        //   icon: 'success',
        //   title: 'Successfully Registered',
        //   showConfirmButton: false,
        //   timer: 3000
        // })
      }
      );
    
    // this.http.post('http://localhost/MNC_PHP_API/vendor/UpdateVendor',vendorMgmt).subscribe(
    // // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(
      
     

    // console.log('contactindividual>>>', contactindividual);

//      if(this.is_business == 'individual'){


      
//        let FirstName = this.vendorMgmt.get('FirstName').value;
//        let LastName = this.vendorMgmt.get('LastName').value;
//        let EIN_SSN = this.vendorMgmt.get('EIN_SSN').value;
//        let Email = this.vendorMgmt.get('Email').value;
//        let Phone =this.vendorMgmt.get('Phone').value;

       



//        let Address1 =this.vendorMgmt.get('Address1').value;
//        let Address2 =this.vendorMgmt.get('Address2').value;
//        let StateId =this.vendorMgmt.get('StateId').value;
//        let CityId= this.vendorMgmt.get('CityId').value;
//        let Zipcode =this.vendorMgmt.get('Zipcode').value;
//        let DistrictId =this.vendorMgmt.get('DistrictId').value;
//        let CountryId =this.vendorMgmt.get('CountryId').value;

//        if(FirstName == null){
//         (document.getElementById('firstname_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(LastName == null ){
//         (document.getElementById('lastname_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(EIN_SSN == null ){
//         (document.getElementById('socialsecurity_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(Email == null ){
//         (document.getElementById('email_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(Phone == null ){
//         (document.getElementById('phone_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(Address1 == null  ){
//         (document.getElementById('currentaddress_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(Address2 == null){
//         (document.getElementById('currentstreet_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(StateId == null){
//         (document.getElementById('stateprovice_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(CityId == null){
//         (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(Zipcode== null){
//         (document.getElementById('currentzipcode_id') as HTMLFormElement).classList.add("validation");
//        }
//        if(DistrictId == null){
//         (document.getElementById('currentcounty_id' ) as HTMLFormElement).classList.add("validation");
//        }
//        if(CountryId == null){
//         (document.getElementById('currentcountry_id') as HTMLFormElement).classList.add("validation");
//        }

//        if(!Email.match(this.mailformat)){
//         (document.getElementById('email_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('email_idmsg') as HTMLFormElement).innerHTML = "Enter valid email address";
//     //   (document.getElementById('email_idmsg') as HTMLFormElement).focus();
//     //  return;
//   }
//   if(!EIN_SSN.match(this.socialno)){
//     (document.getElementById('socialsecurity_id') as HTMLFormElement).classList.add("validation");
// }
// if(!Phone.match(this.phoneformat)){
//   (document.getElementById('phone_id') as HTMLFormElement).classList.add("validation");
// }
// }

//   else{

//     let LegalName = this.vendorMgmt.get('LegalName').value;
//     let NAICSCodes=this.vendorMgmt.get('NAICSCodes').value;
//     let BusinessSize=this.vendorMgmt.get('BusinessSize').value;
//     // alert(naicscode);
//     let CommodityCodes=this.vendorMgmt.get('CommodityCodes').value;
//     // alert(commoditycode);
//     let federal = this.vendorMgmt.get('federal').value;
//     let TradeName = this. vendorMgmt.get('TradeName').value;
//     let DUNS = this.vendorMgmt.get('DUNS').value;
//     let Website = this.vendorMgmt.get('Website').value;

//       let Address1 =this.vendorMgmt.get('Address1').value;
//        let Address2 =this.vendorMgmt.get('Address2').value;
//        let StateId =this.vendorMgmt.get('StateId').value;
//        let CityId= this.vendorMgmt.get('CityId:').value;
//        let  Zipcode =this.vendorMgmt.get(' Zipcode').value;
//        let DistrictId =this.vendorMgmt.get('DistrictId').value;
//        let CountryId =this.vendorMgmt.get('CountryId').value;


//     let ContactName = this.vendorMgmt.get('ContactName').value;
//     let BusinessPhone = this.vendorMgmt.get('BusinessPhone').value;
//     let Title= this.vendorMgmt.get('Title').value;
//     let BusinessEmail = this.vendorMgmt.get('BusinessEmail').value;


// if(LegalName == null){
//   (document.getElementById('legalbusiness_id') as HTMLFormElement).classList.add("validation");
// }
// if(federal == null){
//   (document.getElementById('federal_id') as HTMLFormElement).classList.add("validation");
// }
// if(TradeName == null){
//   (document.getElementById('tradename_id') as HTMLFormElement).classList.add("validation");
// }
// if(DUNS == null){
//   (document.getElementById('dunsno_id') as HTMLFormElement).classList.add("validation");
// }
// if(Website == null){
//   (document.getElementById('businesswebsite_id') as HTMLFormElement).classList.add("validation");
// }
// if(Address1 == null  ){
//   (document.getElementById('currentaddress_id') as HTMLFormElement).classList.add("validation");
//  }
//  if(Address2 == null){
//   (document.getElementById('currentstreet_id') as HTMLFormElement).classList.add("validation");
//  }
//  if(StateId == null){
//   (document.getElementById('stateprovice_id') as HTMLFormElement).classList.add("validation");
//  }
//  if(CityId == null){
//   (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
//  }
//  if( Zipcode == null){
//   (document.getElementById('currentzipcode_id') as HTMLFormElement).classList.add("validation");
//  }
//  if(DistrictId == null){
//   (document.getElementById('currentcounty_id' ) as HTMLFormElement).classList.add("validation");
//  }
//  if(CountryId == null){
//   (document.getElementById('currentcountry_id') as HTMLFormElement).classList.add("validation");
//  }
//  if(ContactName==null){
//   (document.getElementById('contactperson_id') as HTMLFormElement).classList.add("validation");
//  }
//  if(BusinessPhone ==  null){
//   (document.getElementById('businessphone_id') as HTMLFormElement).classList.add("validation");
//  }
//  if(Title == null){
//   (document.getElementById('title_id') as HTMLFormElement).classList.add("validation");
//  }
//  if(BusinessEmail == null){
//   (document.getElementById('businessemail_id') as HTMLFormElement).classList.add("validation");
//  }


//     //  if(Legal_business == null && federal == null && trade_name == null  && duns_no == null && business_website == null &&
//     //   physical_address == null  && street == null && state_province == null && city == null && zip_code == null && county == null && country == null &&
//     //   contact_name == null && business_phone ==  null && title == null  && business_email == null ){


        
//     //   (document.getElementById('legalbusiness_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('federal_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('tradename_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('dunsno_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('businesswebsite_id') as HTMLFormElement).classList.add("validation");

//     //   (document.getElementById('currentaddress_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('currentstreet_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('stateprovice_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('currentzipcode_id') as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('currentcounty_id' ) as HTMLFormElement).classList.add("validation");
//     //   (document.getElementById('currentcountry_id') as HTMLFormElement).classList.add("validation");


//     //    (document.getElementById('contactperson_id') as HTMLFormElement).classList.add("validation");
//     //    (document.getElementById('businessphone_id') as HTMLFormElement).classList.add("validation");
//     //    (document.getElementById('title_id') as HTMLFormElement).classList.add("validation");
//     //    (document.getElementById('businessemail_id') as HTMLFormElement).classList.add("validation");
   
   
//     //   }


//   }
  
 

 }

EmptyErrorMessage(errormessage: any) {

  (document.getElementById(errormessage) as HTMLFormElement).classList.remove("validation");

  }

  // EmptyErrorMessage1(email_idmsg: any) {

  //   (document.getElementById(email_idmsg) as HTMLFormElement).innerHTML = "";
  
  //   }

 
 

  
Displayvendortype(){
  // alert(this.Vendortypevalue);

  let vendor_details = (<HTMLInputElement>document.getElementById("vendortypeactive")).checked;
  console.log(vendor_details);
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
  this.Displayvendortype();

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


display_addresstypeIndividual(addresstype:any){
  if(addresstype == "mail"){
   
    (<HTMLInputElement>document.getElementById("MailingAddressIndividual")).style.display ="block";
    (<HTMLInputElement>document.getElementById("PastAddressIndividual")).style.display ="none";

  }
  else {
   
    (<HTMLInputElement>document.getElementById("PastAddressIndividual")).style.display ="block";
    (<HTMLInputElement>document.getElementById("MailingAddressIndividual")).style.display ="none";
  }
}


display_addresstypeBusiness(addresstype:any){
  if(addresstype == "mail"){
   
    (<HTMLInputElement>document.getElementById("MailingAddressBusiness")).style.display ="block";
    (<HTMLInputElement>document.getElementById("PastAddressBusiness")).style.display ="none";

  }
  else {
   
    (<HTMLInputElement>document.getElementById("PastAddressBusiness")).style.display ="block";
    (<HTMLInputElement>document.getElementById("MailingAddressBusiness")).style.display ="none";
  }
}
 
Address_swipingIndividual(){
  //alert("in");

      let individualMailQn = (<HTMLInputElement>document.getElementById("individualMailQn")).checked;
      // alert(individualMailQn);
      if(individualMailQn == true){
        // alert(this.VendorMgmtIndividual.get('Address1').value)
        this.VendorMgmtIndividual.controls.IMAddress1.setValue(this.VendorMgmtIndividual.get('Address1').value); 
        this.VendorMgmtIndividual.controls.IMAddress2.setValue(this.VendorMgmtIndividual.get('Address2').value);
        this.VendorMgmtIndividual.controls.IMCityId.setValue(this.VendorMgmtIndividual.get('CityId').value);
        this.VendorMgmtIndividual.controls.IMCountryId.setValue(this.VendorMgmtIndividual.get('CountryId').value);
        this.VendorMgmtIndividual.controls.IMZipcode.setValue(this.VendorMgmtIndividual.get('Zipcode').value);
        this.VendorMgmtIndividual.controls.IMStartDate.setValue(this.VendorMgmtIndividual.get('StartDate').value);
        this.VendorMgmtIndividual.controls.IMEndDate.setValue(this.VendorMgmtIndividual.get('EndDate').value);
        this.VendorMgmtIndividual.controls.IMDistrictId.setValue(this.VendorMgmtIndividual.get('DistrictId').value);
        this.VendorMgmtIndividual.controls.IMStateId.setValue(this.VendorMgmtIndividual.get('StateId').value);

 }
 else{

  this.VendorMgmtIndividual.controls.IMAddress1.setValue(""); 
  this.VendorMgmtIndividual.controls.IMAddress2.setValue("");
  this.VendorMgmtIndividual.controls.IMCountryId.setValue("");
  this.VendorMgmtIndividual.controls.IMCityId.setValue("");
  this.VendorMgmtIndividual.controls.IMZipcode.setValue("");
  this.VendorMgmtIndividual.controls.IMStartDate.setValue("");
  this.VendorMgmtIndividual.controls.IMEndDate.setValue("");
  this.VendorMgmtIndividual.controls.IMDistrictId.setValue("");
  this.VendorMgmtIndividual.controls.IMStateId.setValue("");
 }
}


Address_swipingBusiness(){
  //alert("in");

      let individualMailQn = (<HTMLInputElement>document.getElementById("BusinessMailQn")).checked;
      // alert(individualMailQn);
      if(individualMailQn == true){
        // alert(this.VendorMgmtIndividual.get('Address1').value)
        this.VendorMgmtBusiness.controls.BMAddress1.setValue(this.VendorMgmtBusiness.get('Address1').value); 
        this.VendorMgmtBusiness.controls.BMAddress2.setValue(this.VendorMgmtBusiness.get('Address2').value);
        this.VendorMgmtBusiness.controls.BMCityId.setValue(this.VendorMgmtBusiness.get('CityId').value);
        this.VendorMgmtBusiness.controls.BMCountryId.setValue(this.VendorMgmtBusiness.get('CountryId').value);
        this.VendorMgmtBusiness.controls.BMZipcode1.setValue(this.VendorMgmtBusiness.get('Zipcode').value);
        this.VendorMgmtBusiness.controls.BMStartDate.setValue(this.VendorMgmtBusiness.get('StartDate').value);
        this.VendorMgmtBusiness.controls.BMEndDate.setValue(this.VendorMgmtBusiness.get('EndDate').value);
        this.VendorMgmtBusiness.controls.BMDistrictId.setValue(this.VendorMgmtBusiness.get('DistrictId').value);
        this.VendorMgmtBusiness.controls.BMStateId1.setValue(this.VendorMgmtBusiness.get('StateId').value);

 }
 else{

  this.VendorMgmtBusiness.controls.BMAddress1.setValue(""); 
  this.VendorMgmtBusiness.controls.BMAddress2.setValue("");
  this.VendorMgmtBusiness.controls.BMCountryId.setValue("");
  this.VendorMgmtBusiness.controls.BMCityId.setValue("");
  this.VendorMgmtBusiness.controls.BMZipcode1.setValue("");
  this.VendorMgmtBusiness.controls.BMStartDate.setValue("");
  this.VendorMgmtBusiness.controls.BMEndDate.setValue("");
  this.VendorMgmtBusiness.controls.BMDistrictId.setValue("");
  this.VendorMgmtBusiness.controls.BMStateId1.setValue("");
 }
}


GetVendorById(){
 
  let vendoridSes = localStorage.getItem('vendoridSes');

  this.http.get(config_url+'/vendor/GetVendorById?VendorId='+vendoridSes).subscribe(data1 =>
    {

      
      this.singleVendorDet=data1;
      this.singleVendorDet=this.singleVendorDet.SingleVendorDetails;
      console.log("singleVendorDet>>>",this.singleVendorDet);
      this.Vendortypevalue=this.singleVendorDet[0].VendorTypeId;
      // if(this.Vendortypevalue == "B"){
      //   (<HTMLInputElement>document.getElementById("vendortypeactive")).checked = true;
      // }else {
      //   (<HTMLInputElement>document.getElementById("vendortypeactive")).checked = false;
      // }
      //alert(this.Vendortypevalue);
  
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
      this.singleVendorAddressDet=this.singleVendorAddressDet.SingleVendorAddressDetails;

      // this.singleVendorAddressDet[0].StartDate = this.singleVendorAddressDet[0].StartDate.split(" ")[0];

      // this.singleVendorAddressDet[0].EndDate = this.singleVendorAddressDet[0].EndDate.split(" ")[0];   
      console.log( 'singleVendorAddressDet', this.singleVendorAddressDet);
      console.log(this.StartDate);

      for(let i=0;i<this.singleVendorAddressDet.length;i++){
        // alert(this.singleVendorAddressDet[i].AddressTypeId)
        if(this.singleVendorAddressDet[i].AddressTypeId == "C") {
          this.CurrentAddressDetails = this.singleVendorAddressDet[i];
          this.CurrentAddrStartDate = this.singleVendorAddressDet[i].StartDate.split(" ")[0];
          this.CurrentAddrEndDate = this.singleVendorAddressDet[i].EndDate.split(" ")[0];
        }
        if(this.singleVendorAddressDet[i].AddressTypeId == "M") {
          this.MailingAddressDetails = this.singleVendorAddressDet[i];
          this.MailAddrStartDate = this.singleVendorAddressDet[i].StartDate.split(" ")[0];
          this.MailAddrEndDate = this.singleVendorAddressDet[i].EndDate.split(" ")[0];
        }
        if(this.singleVendorAddressDet[i].AddressTypeId == "P") {
          this.PastAddressDetails = this.singleVendorAddressDet[i];
          this.PastAddrStartDate = this.singleVendorAddressDet[i].StartDate.split(" ")[0];
          this.PastAddrEndDate = this.singleVendorAddressDet[i].EndDate.split(" ")[0];
        }
      }
      console.log("this.CurrentAddressDetails",this.CurrentAddressDetails);
      console.log("this.MailingAddressDetails",this.MailingAddressDetails);
      console.log("this.PastAddressDetails",this.PastAddressDetails);
      
      
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

          this.IndBusinessCityNew=this.citylist.citydetails;

          this.IndBusinessPastCity=this.citylist.citydetails;

          // final 
          this.indBusMailAddressCityFinal = this.citylist.citydetails;
          console.log("mail addr city>>>",this.indBusMailAddressCityFinal)

          this.indBusPastAddressCityFinal = this.citylist.citydetails;
          

           this.citylist=this.citylist.citydetails;
          //  console.log(this.citylist)

          
        });

}

getAllZipcodes(){
     
  console.log('in');
  // alert('in');
  this.http.get(config_url+'/app/getZipCode').subscribe( (data: {}) => {
      this.zipcodeVal=data;

      this.IndBusinessZipcodeNew=this.zipcodeVal.zipcodedata;

      this.IndBusinessPastZipcode=this.zipcodeVal.zipcodedata;



       // final
       this.indBusMailAddressZipcodeFinal=this.zipcodeVal.zipcodedata;

       this.indBusPastAddressZipcodeFinal=this.zipcodeVal.zipcodedata;

      this.zipcodeVal=this.zipcodeVal.zipcodedata;
        // console.log(this.zipcodeVal);

       
        
});
}

getcountrydata(){
  this.http.get(config_url+'/app/selectAllCountry').subscribe(
    (countrydata: {}) => {
     
      this.countrytype = countrydata;

      this.IndBusinessCountryNew = this.countrytype.CountryDetails;

      this.IndBusinessPastCountry = this.countrytype.CountryDetails;

      // final
      this.indBusMailAddressCountryFinal = this.countrytype.CountryDetails;

      this.indBusPastAddressCountryFinal = this.countrytype.CountryDetails;

      this.countrytype = this.countrytype.CountryDetails;
      
      // console.log("country",countrydata)

      

});
}

getAllDistricts(){
  this.http.get(config_url+'/app/selectAllDistricts').subscribe(
    (data: {}) => {
     
      this.districts = data;

      this.IndBusinessDistrictsNew = this.districts.selectAllDistricts;

      this.IndBusinessPastDistricts = this.districts.selectAllDistricts;

      // final
      this.indBusMailAddressDistrictFinal = this.districts.selectAllDistricts;

      this.indBusPastAddressDistrictFinal = this.districts.selectAllDistricts;

      this.districts = this.districts.selectAllDistricts;
      // console.log("districts",this.districts);

      
      
});
}

getstatedata(){
 
  this.http.get(config_url+'/app/selectAllState').subscribe(
    (statelistdata: {}) => {
     
      this.statedetail = statelistdata;

      this.IndBusinessStateNew = this.statedetail.statedetails;

      this.IndBusinessPastState = this.statedetail.statedetails;

      // finall
      this.indBusMailAddressStateFinal = this.statedetail.statedetails;

      this.indBusPastAddressStateFinal = this.statedetail.statedetails;

      this.statedetail = this.statedetail.statedetails;
      console.log("state",this.statedetail)

      
});
}

cancelform()
  {
    this.submitted=false;
  }

  cancelform1()
  {
    this.submitted1=false;
  }

  cancelform2()
  {
    this.submitted2=false;
  }

  get rcf1() {
    return this.VendorMgmtIndividual.controls;
  }

  get rcf2() {
    return this.VendorMgmtBusiness.controls;
  }


  // get rcf3() {
  //   return this.contactsform.controls;
  // }

  inputErrorMessage(errormessage: any) {

    //(document.getElementById(errormessage) as HTMLFormElement).classList.remove("validation");
  
    }

    inputErrorMessage1(errormessage: any) {

      //(document.getElementById('passvalidationid') as HTMLFormElement).innerText = 'Passwords must match.!'
    
      }


      onchangezip(){
// alert("in");
        let cityid = (<HTMLInputElement>document.getElementById("currentcity_id")).value;

        this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
          {

            this.zipcodeVal=data1;
            this.zipcodeVal=this.zipcodeVal.zipcodedata;
           })

      }

      onchangestate(){

        let cityid = (<HTMLInputElement>document.getElementById("currentcity_id")).value;

        this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
          {

            console.log(statelist);
            this.statedetail=statelist;
            this.statedetail=this.statedetail.Statelist;
           })

      }

      onchangecountry(){
        // alert("in");
       
        let state_id = (<HTMLInputElement>document.getElementById("stateprovice_id")).value;

        this.http.get(config_url+'/app/getCountryByState?stateid='+state_id).subscribe(countrydata =>
          {
 this.countrytype = countrydata;
            this.countrytype = this.countrytype.countrydata
          })


      }

// for both mail address
      onchangeMailzipIndBus(){
        // alert("in");
      //   this.IndBusinessPastZipcode="";
                let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_mailInd")).value;
        
                this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
                  {
        
                    this.zipcodeValMailAddr=data1;
                    this.indBusMailAddressZipcodeFinal=this.zipcodeValMailAddr.zipcodedata;
                   })
        
              }
        
              onchangeMailstateIndBus(){
                // alert("in");
      //           this.IndBusinessPastState="";
                let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_mailInd")).value;
        
                this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {
        
                    // console.log(statelist);
                    this.statedetailMailAddr=statelist;
                    this.indBusMailAddressStateFinal=this.statedetailMailAddr.Statelist;
                   })
        
              }
        
              onchangeMailcountryIndBus(){
      //           // alert("in");
                
                let state_id = (<HTMLInputElement>document.getElementById("stateprovice_id_mailInd")).value;
        
                this.http.get(config_url+'/app/getCountryByState?stateid='+state_id).subscribe(countrydata =>
                  {
         this.countrytypeMailAddr = countrydata;
                    this.IndBusinessPastCountry = this.countrytypeMailAddr.countrydata
                    console.log(this.IndBusinessPastCountry);
                    this.indBusMailAddressCountryFinal=this.countrytypeMailAddr.countrydata;
                  })
        
        
              }
// for both mail address



// for both past address
onchangezipPastAddr(){
  // alert("in");
//   this.IndBusinessPastZipcode="";
          let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_Past")).value;
  
          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {
  
              this.zipcodeValPastAddr=data1;
              this.indBusPastAddressZipcodeFinal=this.zipcodeValPastAddr.zipcodedata;
             })
  
        }
  
        onchangestatePastAddr(){
          // alert("in");
//           this.IndBusinessPastState="";
          let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_Past")).value;
  
          this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
            {
  
              // console.log(statelist);
              this.statedetailPastAddr=statelist;
              this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
             })
  
        }
  
        onchangecountryPastAddr(){
//           // alert("in");
          
          let state_id = (<HTMLInputElement>document.getElementById("stateprovice_id_past")).value;
  
          this.http.get(config_url+'/app/getCountryByState?stateid='+state_id).subscribe(countrydata =>
            {
   this.countrytypePastAddr = countrydata;
              this.indBusPastAddressCountryFinal = this.countrytypePastAddr.countrydata
              console.log(this.IndBusinessCountryNew);
            })
  
  
        }
// for both past address

GetVendorContactById(){
 
  let vendoridSes = localStorage.getItem('vendoridSes');

  this.http.get(config_url+'/vendor/GetVendorContactById?VendorId='+vendoridSes+"&VendorContactPrimary=1").subscribe(data1 =>
    {

      
      this.SingleVendorContactDetailsArr=data1;
      this.SingleVendorContactDetailsArr=this.SingleVendorContactDetailsArr.SingleVendorContactDetails;
      console.log("SingleVendorContactDetailsArr>>>",this.SingleVendorContactDetailsArr);
      
    })

}


GetVendorContactByNotPrimary(){
 
  let vendoridSes = localStorage.getItem('vendoridSes');

  this.http.get(config_url+'/app/getVContactNotPrimary?VendorId='+vendoridSes+"&VendorContactPrimary=0").subscribe(data1 =>
    {

      
      this.SingleVendorContactNotPrimary=data1;
      this.SingleVendorContactNotPrimary=this.SingleVendorContactNotPrimary.VendorContact;
      console.log("SingleVendorContactNotPrimary>>>",this.SingleVendorContactNotPrimary);
      // alert(this.SingleVendorContactNotPrimary.length);
      for(let i=0;i<this.SingleVendorContactNotPrimary.length;i++){
        if(this.contactList!=null)
    {
      this.contactList.push(this.createcontact1(this.SingleVendorContactNotPrimary[i].ContactName,  
        this.SingleVendorContactNotPrimary[i].JobTitle,this.SingleVendorContactNotPrimary[i].Email,
        this.SingleVendorContactNotPrimary[i].Phone,this.SingleVendorContactNotPrimary[i].VendorContactActive,
        this.SingleVendorContactNotPrimary[i].ContactId));
    }
    
      }
// alert(this.SingleVendorContactNotPrimary.length);
      if(this.SingleVendorContactNotPrimary.length == 0){
    //     alert("in")
    //     this.contactsform = this.frmbuilder.group({
    //   contactarray: this.frmbuilder.array([
    //    this.createcontact()
    //   ])
    // });
    // this.contactList = this.contactsform.get('contactarray') as FormArray;


        // this.contactsform = this.frmbuilder.group({
        //   contactarray: this.frmbuilder.array([
        //     this.createcontact()
        //   ])
        // });
      //   this.contactsform = this.frmbuilder.group({
      //     contactarray: this.frmbuilder.array([this.createcontact()])
      //   });
      }
      
    })

}




// onchange event

changeAllByCityMailBusiness() {
  let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_Past")).value;
  
          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {
  
              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
              this.VendorMgmtBusiness.controls.BMZipcode1.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {
    
                // console.log(statelist);
                this.statedetailPastAddr=statelist;
                
                this.VendorMgmtBusiness.controls.BMStateId1.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {
      
                  
                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtBusiness.controls.BMDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {
        
                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;
                    
                    this.VendorMgmtBusiness.controls.BMStateId1.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                    

                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;
                        
                        this.VendorMgmtBusiness.controls.BMCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })
                   
                  
}


changeAllDetailsByCityPastBusiness(){
  // alert("in");
  let cityid = (<HTMLInputElement>document.getElementById("currentcity_idPastBusiness")).value;
  
          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {
  
              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
              this.VendorMgmtBusiness.controls.BPZipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {
    
                // console.log(statelist);
                this.statedetailPastAddr=statelist;
                
                this.VendorMgmtBusiness.controls.BPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {
      
                  
                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtBusiness.controls.BPDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {
        
                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;
                    
                    this.VendorMgmtBusiness.controls.BPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                    

                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;
                        
                        this.VendorMgmtBusiness.controls.BPCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })
}



// current address
changeAllDetailsByCityCurrentBusiness(){
  // alert("in");
  let cityid = (<HTMLInputElement>document.getElementById("currentcity_idbus")).value;
  
          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {
  
              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
              this.VendorMgmtBusiness.controls.Zipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {
    
                // console.log(statelist);
                this.statedetailPastAddr=statelist;
                
                this.VendorMgmtBusiness.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {
      
                  
                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtBusiness.controls.DistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {
        
                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;
                    
                    this.VendorMgmtBusiness.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                    

                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;
                        
                        this.VendorMgmtBusiness.controls.CountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })
}



// individual current address

changeAllDetailsByCityCurrentIndividual(){
 
  let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_ind")).value;
  // alert(cityid);
          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {
  
              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
              this.VendorMgmtIndividual.controls.Zipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {
    
                // console.log(statelist);
                this.statedetailPastAddr=statelist;
                
                this.VendorMgmtIndividual.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {
      
                  
                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtIndividual.controls.DistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {
        
                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;
                    
                    this.VendorMgmtIndividual.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                    

                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;
                        
                        this.VendorMgmtIndividual.controls.CountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })
}

//
changeAllDetailsByCityMailIndividual(){
//  alert("in");
  let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_mailInd")).value;
  // alert(cityid);
          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {
  
              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
              this.VendorMgmtIndividual.controls.IMZipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
              
             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {
    
                // console.log(statelist);
                this.statedetailPastAddr=statelist;
                
                this.VendorMgmtIndividual.controls.IMStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {
      
                  
                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtIndividual.controls.IMDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {
        
                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;
                    
                    this.VendorMgmtIndividual.controls.IMStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                    

                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;
                        
                        this.VendorMgmtIndividual.controls.IMCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })
}


changeAllDetailsByCityPastIndividual(){
  //  alert("in");
    let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_mailInd")).value;
    // alert(cityid);
            this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
              {
    
                this.zipcodeValPastAddr=data1;
                console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
                
                this.VendorMgmtIndividual.controls.IPZipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);
                
               })
  
               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {
      
                  // console.log(statelist);
                  this.statedetailPastAddr=statelist;
                  
                  this.VendorMgmtIndividual.controls.IPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                 })
  
                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {
        
                    
                    this.statedetailPastAddr=statelist;
                    // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                    this.VendorMgmtIndividual.controls.IPDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                   })
  
                   this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                    {
          
                      // console.log(statelist);
                      this.statedetailPastAddr=statelist;
                      
                      this.VendorMgmtIndividual.controls.IPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                      
  
                      this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                        {
                          // alert(this.globalStateid);
               this.countrytypePastAddr = countrydata;
                          
                          this.VendorMgmtIndividual.controls.IPCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                        })
                     })
  }
}

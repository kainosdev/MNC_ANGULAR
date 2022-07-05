import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../views/shared/constant';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.scss']
})
export class RegistrationformComponent implements OnInit {

  registercontactinformation:any;
   vendor: any;
   employeeinformation:any;
   jobdetail: any;
   jobtitle: any;
   employeedetail: any;
   employeetype: any;
   statetype:any;
   statedetail:any;
   userdata:any;
   usertypedata:any;
   selectedStateObj:any;
   citytype:any;
   citydetail:any;
   zipcodelist:any;
   zipcodedetail: any;
   overalldata: any;
   countrytype: any;
   countrydetail: any;
   beclassificationtype: any;
   beclassificationdetail:any;
   citylist:any;
   cityalldetail:any;
 
 
   constructor(private frmbuilder: FormBuilder,  private http: HttpClient) { }
 
   ngOnInit(): void {
 
     this.gejobtitledata();
     this.getemployeedata();
     this.getusertypedata();
     this. getstatedata();
     this.getcountrydata();
     this.getbeclassificationdata();
    //  this.Getcityall_list()
    //  this. getzipcodebycityid();
     // this.onChangeObj();
 
     this.registercontactinformation = this.frmbuilder.group({
 
       FirstName: [],
       LastName: [],
       UserTypeId: [],
       UserId: [],
       UserPassword: [],
       conformpassword: [],
 
       Address1: [],
       Address2: [],
       CityId: [],
       Zipcode: [],
       StateId: [],
       county_name: [],
       CountryId: [],
      
       VendorTypeId: [],
       EIN_SSN:[],
       OutreachEmailOptIn:[],
       BusinessSize: [],
       BEClassificationId: [],
 
       JobTitleId:[],
       EmploymentTypeId:[],
       StartDate:[],
       Phone:[],
       // AdminUser: [],
 
 })
 
 // this. employeeinformation = this.frmbuilder.group({
 
 //  })
 
 }
 
 phoneformat= /^[0-9]{10}$/;
 socialno =  /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
 useridmatch=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
 
 alpha(event: any){
   var inp = String.fromCharCode(event.keyCode);
 
 if (/[a-zA-Z]/.test(inp)) {
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
 
   validation(registercontactinformation:any){
 
     console.log( 'Contact Information',registercontactinformation);
     // console.log('employee', employeeinformation);
 
     let FirstName = this.registercontactinformation.get('FirstName').value;
     let LastName = this.registercontactinformation.get('LastName').value;
     let UserTypeId = this.registercontactinformation.get('UserTypeId').value;
     // alert(UserTypeId);
     let UserId = this.registercontactinformation.get('UserId').value;
     let UserPassword = this.registercontactinformation.get('UserPassword').value;
     let conformpassword = this.registercontactinformation.get('conformpassword').value;
    
 
 
     let Address1 = this.registercontactinformation.get('Address1').value;
     let Address2 = this.registercontactinformation.get('Address2').value;
     let StateId = this.registercontactinformation.get('StateId').value;
     let CityId = this.registercontactinformation.get('CityId').value;
     let Zipcode = this.registercontactinformation.get('Zipcode').value;
     let county_name = this.registercontactinformation.get('county_name').value;
     let CountryId = this.registercontactinformation.get('CountryId').value;
     
 
     let active1 = (<HTMLInputElement>document.getElementById("active")).checked;
 
     let EIN_SSN = this.registercontactinformation.get('EIN_SSN').value;
     let BusinessSize = this.registercontactinformation.get('BusinessSize').value;
     let BEClassificationId = this.registercontactinformation.get('BEClassificationId').value;
 
     let JobTitleId = this.registercontactinformation.get('JobTitleId').value;
     let EmploymentTypeId = this.registercontactinformation.get('EmploymentTypeId').value;
     let StartDate = this.registercontactinformation.get('StartDate').value;
     let Phone = this.registercontactinformation.get('Phone').value;
 
 
     let usertype_id = (<HTMLInputElement>document.getElementById("usertype_id")).value;
 
     if(FirstName == null )
       {
        (document.getElementById('firstname_id') as HTMLFormElement).classList.add("validation");
      }
 
     if(LastName == null) 
       {
       (document.getElementById('lastname_id') as HTMLFormElement).classList.add("validation");
      }
 
      if(UserTypeId == null)
      {
      (document.getElementById('usertype_id') as HTMLFormElement).classList.add("validation");
       }
       if(UserId == null)
      {
       (document.getElementById('userkey') as HTMLFormElement).classList.add("validation");
       }
      if(UserPassword == null)
      {
       (document.getElementById('userpswd_id') as HTMLFormElement).classList.add("validation");
       }
       if(conformpassword == null)
      {
       (document.getElementById('comformpswd_id') as HTMLFormElement).classList.add("validation");
       }
       
       if(Address1 == null)
       {
        (document.getElementById('currentadd_id') as HTMLFormElement).classList.add("validation");
        }
        if(Address2 == null)
        {
         (document.getElementById('currentsecadd_id') as HTMLFormElement).classList.add("validation");
         }
        
          if(Zipcode == null)
         {
          (document.getElementById('regcurrentzip_id') as HTMLFormElement).classList.add("validation");
          }
          if(CityId == null)
         {
          (document.getElementById('currentcity_id') as HTMLFormElement).classList.add("validation");
          }
          if(StateId == null)
          {
           (document.getElementById('curstate_id') as HTMLFormElement).classList.add("validation");
           }
          if(county_name == null)
          {
           (document.getElementById('county_id') as HTMLFormElement).classList.add("validation");
           }
           if(CountryId == null)
           {
            (document.getElementById('country_id') as HTMLFormElement).classList.add("validation");
            }
 
            if(!UserId.match(this.useridmatch)){
 
             (document.getElementById('userkey') as HTMLFormElement).classList.add("validation");
           }
 
      if(UserPassword != (conformpassword)){
 
       (document.getElementById('comformpswd_id') as HTMLFormElement).classList.add("validation");
     }
 
 
     if(usertype_id == "EMPLOY"){
     
 
       if(JobTitleId == null)
       {
        (document.getElementById('job_title') as HTMLFormElement).classList.add("validation");
        }
        if(EmploymentTypeId == null)
       {
        (document.getElementById('employee_id') as HTMLFormElement).classList.add("validation");
        }
        if(StartDate == null)
       {
        (document.getElementById('startdate_id') as HTMLFormElement).classList.add("validation");
        }
        if(Phone == null)
       {
        (document.getElementById('phoneno_id') as HTMLFormElement).classList.add("validation");
        }
 
     }
 
 
     if(active1 == false){
 
     if(EIN_SSN == null){
       (document.getElementById('socialno_id') as HTMLFormElement).classList.add("validation");
     }
 
       // if(!EIN_SSN.match(this.socialno)){
 
     //   (document.getElementById('socialno_id') as HTMLFormElement).classList.add("validation");
     // }
   
       
     }
 
     else{
 
       if(BusinessSize == null){
         (document.getElementById('business_id') as HTMLFormElement).classList.add("validation");
       }
 
       if(BEClassificationId == null){
         (document.getElementById('be_classificationid') as HTMLFormElement).classList.add("validation");
       }
         
       }
 
       if(FirstName != null && FirstName != "" && LastName != null && LastName != "" && UserId != null && UserId != "" && UserPassword != null && UserPassword != "" && Address1 != null && Address1 != "" && Address2 != null && Address2 != "" && StateId != null && StateId != "" && 
         CityId != null && CityId != "" && Zipcode != null && Zipcode != "" && CountryId != null && CountryId != ""){
         
           
           if(usertype_id == "OTHER"){
 
             if(FirstName != null && FirstName != "" && LastName != null && LastName != "" && UserId != null && UserId != "" && UserPassword != null && UserPassword != "" && Address1 != null && Address1 != "" && Address2 != null && Address2 != "" && StateId != null && StateId != "" && 
             CityId != null && CityId != "" && Zipcode != null && Zipcode != "" && CountryId != null && CountryId != ""){
     
               this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/AdduserDetails', this.registercontactinformation).subscribe(
           
                 data => {
                   console.log("data");
                     console.log('POST Request is successful >>>>>>>>', data);
           
                 },
                 success => {
                   console.log("success");
                 }
               );
     
             }
             
           }
 
 
           if(usertype_id == "EMPLOY"){
 
             if(JobTitleId != null && JobTitleId != "" && EmploymentTypeId != null && EmploymentTypeId != "" && StartDate != null && StartDate != "" && Phone != null && Phone != ""){
     
               this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/AdduserDetails', this.registercontactinformation).subscribe(
           
                 data => {
                   console.log("data");
                     console.log('POST Request is successful >>>>>>>>', data);
           
                 },
                 success => {
                   console.log("success");
                 }
               );
     
             }
             
           }
 
 
 
           if(usertype_id == "VENDOR"){
 
             if(active1 == false){
 
               if(EIN_SSN != null && EIN_SSN != ""){
 
                 this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/AdduserDetails', this.registercontactinformation).subscribe(
           
                 data => {
                   console.log("data");
                     console.log('POST Request is successful >>>>>>>>', data);
           
                 },
                 success => {
                   console.log("success");
                 }
               );
     
             }
            if(!EIN_SSN.match(this.socialno)){
                  (document.getElementById('socialno_id') as HTMLFormElement).classList.add("validation");
                 }
               }
             }
 
             if(usertype_id == "VENDOR"){
 
               if(BusinessSize != null && BusinessSize != "" && BEClassificationId != null && BEClassificationId != ""){
 
                 
                 this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/AdduserDetails', this.registercontactinformation).subscribe(
           
                 data => {
                   console.log("data");
                     console.log('POST Request is successful >>>>>>>>', data);
           
                 },
                 success => {
                   console.log("success");
                 }
               );
     
             }
               }
 
 
             // }
 
 
              }
           
 
       }
 
   inputErrorMessage(errormessage: any) {
 
     (document.getElementById(errormessage) as HTMLFormElement).classList.remove("validation");
   
     }
 
     vendortype_display(active:any){
 
       let active1 = (<HTMLInputElement>document.getElementById("active")).checked;
      
       if(active1 == true){
 
         (<HTMLInputElement>document.getElementById("vendorbusiness")).style.display ="block";
         (<HTMLInputElement>document.getElementById("vendorindividual")).style.display ="none";
         
       }
 
       else if(active1 == false){
 
         (<HTMLInputElement>document.getElementById("vendorbusiness")).style.display ="none";
         (<HTMLInputElement>document.getElementById("vendorindividual")).style.display ="block";
 
       }
     }
 
     vendordetails_display(){
       let usertype_id = (<HTMLInputElement>document.getElementById("usertype_id")).value;
       // alert(usertype_id);
      
       if(usertype_id == 'VENDOR'){
 
         (<HTMLInputElement>document.getElementById("vendordetails")).style.display ="block";
         (<HTMLInputElement>document.getElementById("employeeinfo")).style.display ="none";
       }
     else  if(usertype_id == 'EMPLOY'){
         (<HTMLInputElement>document.getElementById("employeeinfo")).style.display ="block";
         (<HTMLInputElement>document.getElementById("vendordetails")).style.display ="none";
        }
 
       else {
         (<HTMLInputElement>document.getElementById("vendordetails")).style.display ="none";
         (<HTMLInputElement>document.getElementById("employeeinfo")).style.display ="none";
       }
     }
 
     gejobtitledata(){
      
       this.http.get(config_url+'/employee/selectJobTitle').subscribe( (data: {}) => {
           this.jobtitle=data;
           this.jobdetail=this.jobtitle.data.JobTitle;
             
     });
     }
 
     getemployeedata(){
       this.http.get(config_url+'/employee/selectEmployeeType').subscribe(
         (employeedata: {}) => {
           this.employeetype=employeedata;
           this.employeedetail=this.employeetype.data.EmployeeDetails;
      });
     }
 
     getusertypedata(){
    
       this.http.get(config_url+'/app/selectUserType').subscribe(
         (usertype: {}) => {
           this.userdata=usertype;
           this.usertypedata=this.userdata.data.UserTypeDetails;
                 // console.log("usertypedata>>>",this.usertypedata)
     });
     }
 
     getstatedata(){
 
       this.http.get(config_url+'/app/selectAllState').subscribe(
         (statelistdata: {}) => {
          
           this.statetype = statelistdata;
           this.statedetail = this.statetype.data.statedetails;
           // console.log("state",this.statedetail)
     });
     }
 
//      onChangeObj(newObj: any) {
   
//     let stateid = (<HTMLInputElement>document.getElementById("curstate_id")).value;
 
  
 
//  // alert(cityid);
  
//     this.http.get(config_url+'/app/getCityDistrictByState?stateid='+stateid).subscribe(data =>
//          {
//            this.citytype=data;
//            this.citydetail=this.citytype.data.citydistrictdata;
//            // console.log( 'city', this.citytype)
//          })
 
 
         
 
//        }
 
       onchangezip(){
 
         let cityid = (<HTMLInputElement>document.getElementById("currentcity_id")).value;
 
         this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
           {
 
             console.log(data1);
             this.zipcodelist=data1;
             this.zipcodedetail=this.zipcodelist.data.zipcodedata;
             console.log( 'zipcode', this.zipcodedetail)
           })
 
       }
 
       getcountrydata(){
         this.http.get(config_url+'/app/selectAllCountry').subscribe(
           (countrydata: {}) => {
            
             this.countrytype = countrydata;
             this.countrydetail = this.countrytype.data.CountryDetails
             // console.log("country",countrydata)
       });
       }
 
       getbeclassificationdata(){
         console.log("in");
         this.http.get(config_url+'/app/selectBEClassification').subscribe(
           (beclassificationdata: {}) => {
            
             this.beclassificationtype = beclassificationdata;
             this.beclassificationdetail = this.beclassificationtype.data.BEClassification
            //  console.log("country",countrydata)
       });
       }
 
       getzipcodebycityid(){
        this.http.get(config_url+'/app/getZipcodeByCity').subscribe(
          (zipcodeid: {}) => {

            this.zipcodelist=zipcodeid;
             this.zipcodedetail=this.zipcodelist.data.zipcodedata;

          });
       }

      // Getcityall_list(){

      //   this.http.get(config_url+'/app/selectAllcity').subscribe(
      //         (citylist: {}) => {
      //         //  console.log( 'citylist', citylist);
    
      //           this.citylist=citylist;
      //            this.cityalldetail=this.citylist.data.citydetails;
      //            console.log(this.cityalldetail)
    
      //         });

      // }
 
     // inputErrorMessage1(phoneErr: any){
     //   (document.getElementById(phoneErr) as HTMLFormElement).innerHTML = "";
     // }
 }

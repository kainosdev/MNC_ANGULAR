import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import { ViewChild, ElementRef } from "@angular/core";


@Component({
  selector: 'app-bid-management',
  templateUrl: './bid-management.component.html',
  styleUrls: ['./bid-management.component.scss']
})
export class BidmanagementComponent implements OnInit { 
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  bid_form: FormGroup | any;
  clinform:FormGroup | any;
  submitted = false;
  bid_form_show=true;
  clin_submitted=false;
  bidstatus:any;
  biddetails:any;
  contractVehicle:any;
  aside_type_list:any;
  opportunity_type_list:any;
  contract_officer_list:any;
  service_type_list:any;
  dbe_list:any;
  BuyingEntitylist:any;
  stepname="Details"
  a="1";
  b="2";
  c="3";
  collapsing = true;
  error: string;
  dragAreaClass: string;
  draggedFiles: any;
  
  files: any[] = [];
 

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  clin_list:any =[];
  constructor(private frmbuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    this.personalDetails = this.frmbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['',Validators.required]
  });
  this.addressDetails = this.frmbuilder.group({
      city: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['',Validators.required]
  });
  this.educationalDetails = this.frmbuilder.group({
      highest_qualification: ['', Validators.required],
      university: ['', Validators.required],
      total_marks: ['',Validators.required]
  });
    this.bid_form = this.frmbuilder.group({
      social_no:['',[Validators.required]],
      bidstatus: ['',[Validators.required]],
      title: ['',[Validators.required]],
      description: ['', [Validators.required]],
      opportunity_type:['', [Validators.required]],
      category:['', [Validators.required]],
      buying_entry:['', [Validators.required]],
      set_aside:['', [Validators.required]],
      contrcat_officer:['', [Validators.required]],
      co_officer_phone:['', [Validators.required]],
      co_officer_email:['', [Validators.required]],
      no_of_response:['', [Validators.required]],
      

      fund_source:['', [Validators.required]],
      contract_vehicle:['', [Validators.required]],
      budget_amount:['', [Validators.required]],
      posted_date:['', [Validators.required]],
      question_due_date:['', [Validators.required]],
      response_due_date:['', [Validators.required]],
      dbe_goal:['', [Validators.required]],

      

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
       county_name: ['', [Validators.required]],
       StartDate: ['', [Validators.required]],
       EndDate: ['', [Validators.required]],
       CountryId:  ['', [Validators.required]],
       UserStatusId:['N'],
      
      });
      this.clinform = this.frmbuilder.group({

        //contact details
        clin: ['', [Validators.required]],
        desc:  ['', [Validators.required]],
        service_type:  ['', [Validators.required]],
        dbe_goal_type:  ['', [Validators.required]],
        dbe_goal:  ['', [Validators.required]],
        dbe_budget: ['', [Validators.required]],
        });
      this.GetBidStatus();
      this.GetContract_vehicle();
      this.GetSet_aside();
      this.GetOpportunity_type();
      this.GetContract_officer();
      this.GetDbe_Goal_Type();
      this.GetServiceType();
      this.GetBuyingentity();
     this.GetBidDetailsById();
  }
  get personal() { return this.personalDetails.controls; }
  get education() { return this.educationalDetails.controls; }
  get address() { return this.addressDetails.controls; }
  get bfc() {
    return this.bid_form.controls;
  }
  get clfc()
  {
    return this.clinform.controls;
  }
  onFileDropped($event:any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(data:any) {
    debugger
    var files=data.target.files
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes:any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  saveFiles(files: FileList) {

    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
      console.log(files[0].size,files[0].name,files[0].type);
      this.draggedFiles = files;
      console.log(files);
    }
  }
  GetBidDetailsById()
  {
    try
    {
      let BidNumber = localStorage.getItem('BidNumber');

      this.http.get(config_url+'/bid/GetBidByNumber?BidNumber='+localStorage.getItem('BidNumber')).subscribe((data: any) =>
       {
          var response= data.BidDetails;
          if(response != null && response.length>0)
          //debugger;
          {
            this.biddetails = response[0];
            console.log(this.biddetails )
           // debugger;
            this.bid_form.patchValue({ 
            social_no: this.biddetails.BidNumber,
            bidstatus: this.biddetails.BidStatusId,
            title: this.biddetails.Title,
            description: this.biddetails.Descritpion,
            opportunity_type:this.biddetails.SolicitationTypeId,
            category:this.biddetails.BidStatusId,
            buying_entry:this.biddetails.BuyingEntityTypeId,
            set_aside:this.biddetails.SetAsideTypeId,
            contrcat_officer:'',
            co_officer_phone:this.biddetails.ContractNumber,
            co_officer_email:this.biddetails.BidStatusId,
            no_of_response:this.biddetails.BidStatusId,


            fund_source:this.biddetails.FundingSourceId,
            contract_vehicle:this.biddetails.ContractVehicleId,
            budget_amount:this.biddetails.BidBudgetAmount,
            posted_date:this.biddetails.BidPostedDate.split(" ")[0],
            question_due_date:'',
            response_due_date:this.biddetails.BidResponseDueDate.split(" ")[0],
            dbe_goal:this.biddetails.BidBudgetAmount,
           });  
          }
        
           // console.log(this.bidstatus)
        });
    }
    catch(e) 
    {
      console.log(e); 
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
  GetBuyingentity()
  {
    try
    {
      this.http.get(config_url+'/bid/BuyingEntity').subscribe(
        (data: any) => {
          var response= data.BuyingEntity;
          this.BuyingEntitylist = response;
           // console.log(this.contractVehicle)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
  }
  GetContract_vehicle(){
    try
    {
      this.http.get(config_url+'/app/ContractVehicle').subscribe(
        (data: any) => {
          var response= data.ContractVehicle;
          this.contractVehicle = response;
           // console.log(this.contractVehicle)
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
  GetContract_officer(){
    try
    {
      this.http.get(config_url+'/app/ContractingofficerByJobtitle').subscribe(
        (data: any) => {
          var response= data.contractingofficer;
          this.contract_officer_list = response;
           // console.log(this.contract_officer_list)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }
  GetDbe_Goal_Type(){
    try
    {
     
      this.http.get(config_url+'/app/BidBEGoalTYpe').subscribe(
        (data: any) => {
          var response= data.BidBEGoalType;
          this.dbe_list = response;
           // console.log(this.dbe_list)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }
  GetServiceType(){
    try
    {
      this.http.get(config_url+'/app/ServiceType').subscribe(
        (data: any) => {
          var response= data.ServiceType;
          this.service_type_list = response;
           // console.log(this.service_type_list)
        });
    }
    catch(e) 
    {
      console.log(e); 
    }
      
  }
  clinsave()
  {
    this.clin_submitted=true;
    if (this.clinform.invalid) 
    {
        return;
    }
    else
    {
      
     this.clin_list.push(this.clinform.value)
     this.clinform.reset()
     this.clin_submitted=false;
   
    }

  }
  generalsave() 
  {
     
      this.submitted = true;
      let usertype_id = (<HTMLInputElement>document.getElementById("usertype_id")).value;
      if(usertype_id == "EMPLOY")
      {

        if (this.bid_form.invalid) 
        {
            return;
        }
        else
        {
          
         
          alert(JSON.stringify(this.bid_form.value))
       
        }
   
      }
  }
  next(){
    if(this.step==1){
          this.personal_step = true;
          // if (this.personalDetails.invalid) 
          // { return  
          // }
          this.step++
    }
    else if(this.step==2){
        this.address_step = true;
        // if (this.addressDetails.invalid) { return }
            this.step++;
    }
    else if(this.step==3){
      this.address_step = true;
      // if (this.addressDetails.invalid) { return }
          this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.education_step = false;
    }
  }

  submit(){
    if(this.step==3){
      this.education_step = true;
      if (this.educationalDetails.invalid) { return }
    }
  }


  inputErrorMessage(errormessage: any) {

    (document.getElementById(errormessage) as HTMLFormElement).classList.remove("validation");
  
    }

    inputErrorMessage1(errormessage: any) {

      (document.getElementById('passvalidationid') as HTMLFormElement).innerText = 'Passwords must match.!'
    
      }

}

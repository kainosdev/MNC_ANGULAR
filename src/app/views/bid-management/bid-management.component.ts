import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService, TOOLBAR_POSITION, TOOLBAR_BUTTON_POSITION, STEP_STATE, StepValidationArgs } from 'ng-wizard';


@Component({
  selector: 'app-bid-management',
  templateUrl: './bid-management.component.html',
  styleUrls: ['./bid-management.component.scss']
})
export class BidmanagementComponent implements OnInit { 
  bid_form: FormGroup | any;
  submitted = false;
  bid_form_show=true;
  stepname="Details"
  a="1";
  b="2";
  c="3";
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
 

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  constructor(private frmbuilder: FormBuilder,private ngWizardService: NgWizardService) { }

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

      bidstatus: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      opportunity_type:['', [Validators.required]],
      category:['', [Validators.required]],
      buying_entry:['', [Validators.required]],
      set_aside:['', [Validators.required]],
      contrcat_officer:['', [Validators.required]],
      co_officer_phone:['', [Validators.required]],
      co_officer_email:['', [Validators.required]],
      no_of_response:['', [Validators.required]],

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
  }
  get personal() { return this.personalDetails.controls; }
  get education() { return this.educationalDetails.controls; }
  get address() { return this.addressDetails.controls; }
  get bfc() {
    return this.bid_form.controls;
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
    stepChanged(args: StepChangedArgs) {
      console.log(args.step);
    }
    inputErrorMessage1(errormessage: any) {

      (document.getElementById('passvalidationid') as HTMLFormElement).innerText = 'Passwords must match.!'
    
      }

}

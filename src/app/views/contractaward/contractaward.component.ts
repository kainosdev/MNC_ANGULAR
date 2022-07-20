import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from '../shared/rest-api.service';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { config_url } from '../shared/constant';


@Component({
  selector: 'app-contractaward',
  templateUrl: './contractaward.component.html',
  styleUrls: ['./contractaward.component.scss']
})

export class ContractawardComponent implements OnInit {
  displayStyle = "none";


  contractaward: FormGroup | any;
  submitted = false;
  title = 'datatables';
  dtOptions: DataTables.Settings = {};

  bidstatusdetail: any;
  contractvehicledetail: any;
  // posts: any;
  constructor(private http: HttpClient, private frmbuilder: FormBuilder,     private restApi: RestApiService
    ) { }

  ngOnInit(): void {

    this.getBidStatus();
    this.getContractVehicle();
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.contractaward = this.frmbuilder.group({
      SolicitationNumber: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      VendorName:['', [Validators.required]],
      ContractNumber:['', [Validators.required]],
      Title:['', [Validators.required]],
      ProcurementCategory:['', [Validators.required]],
      Department:['', [Validators.required]],
      ContractVehicle:['', [Validators.required]],
      PostedDate:['', [Validators.required]],
      BudgetAmount:['', [Validators.required]],
      QuestionsDueDate:['', [Validators.required]],
      ResponseDueDate: ['', [Validators.required]],
      DBEGoal:['', [Validators.required]],
      FundingSource:['', [Validators.required]],
      DBEGoalCommitted:['', [Validators.required]],
      ContractValue:['', [Validators.required]],
      ContractPeriodPlanned:['', [Validators.required]],
      ToDatePlanned:['', [Validators.required]],
      ContractPeriodActual:['', [Validators.required]],
      ToDateActual:['', [Validators.required]],
      NumberofBaseYears:['', [Validators.required]],
      NumberofOptionYears:['', [Validators.required]],
      TechnicalMonitor:['', [Validators.required]],
      ContractingOfficer:['',[Validators.required]]

    })



  }

  get ca() {
    return this.contractaward.controls;
  }

  submitContractAward(){
    this.submitted = true;
  }
  cancelform(){
    this.submitted = false;
  }
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup(){
    this.displayStyle = "none";
  }
  getBidStatus(){
    this.http.get(config_url+'/app/BidStatus').subscribe(
      (bidstatus: {}) => {
       console.log(bidstatus);
       this.bidstatusdetail=bidstatus;
       this.bidstatusdetail=this.bidstatusdetail.BidStatus;


      });

  }
  getContractVehicle(){
    this.http.get(config_url+'/app/ContractVehicle').subscribe(
      (contractvehicle: {}) => {
       console.log(contractvehicle);
       this.contractvehicledetail=contractvehicle;
       this.contractvehicledetail=this.contractvehicledetail.ContractVehicle;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-contractaward',
  templateUrl: './contractaward.component.html',
  styleUrls: ['./contractaward.component.scss']
})

export class ContractawardComponent implements OnInit {
 

  contractaward: FormGroup | any;
  submitted = false;
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  // posts: any;
  constructor(private http: HttpClient, private frmbuilder: FormBuilder) { }

  ngOnInit(): void {
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
      ContractPeriod:['', [Validators.required]],
      ToDate:['', [Validators.required]],
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
}

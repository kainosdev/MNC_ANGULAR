import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import { ViewChild, ElementRef } from "@angular/core";


@Component({
  selector: 'app-bid-responses',
  templateUrl: './bid-responses.component.html',
  styleUrls: ['./bid-responses.component.scss']
})
export class BidResponsesComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  bid_form: FormGroup | any;
  collapsing = true;
  error: string;
  submitted = false;
  bidstatus:any;

  //dtOptions: DataTables.Settings = {};
  title = 'datatables';

  constructor(private frmbuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {

    this.bid_form = this.frmbuilder.group({
      social_no:['',[Validators.required]],
      bidstatus: ['',[Validators.required]],
      title: ['',[Validators.required]],
      
    })
    return this.bid_form.controls;
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
    this.GetBidStatus();
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
  get bfc() {
    return this.bid_form.controls;
  }
}
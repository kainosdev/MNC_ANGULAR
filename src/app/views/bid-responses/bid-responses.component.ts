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
  [x: string]: any;
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  bid_form: FormGroup | any;

  //dtOptions: DataTables.Settings = {};
  title = 'datatables';

  constructor() { }

  ngOnInit(): void {

    this.bid_form = this.frmbuilder.group({
      social_no:['',[Validators.required]],
      bidstatus: ['',[Validators.required]],
      
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}

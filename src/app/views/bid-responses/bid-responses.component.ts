import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bid-responses',
  templateUrl: './bid-responses.component.html',
  styleUrls: ['./bid-responses.component.scss']
})
export class BidResponsesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  title = 'datatables';

  constructor() { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}

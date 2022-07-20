import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-bidresponses',
  templateUrl: './view-bidresponses.component.html',
  styleUrls: ['./view-bidresponses.component.scss']
})
export class ViewBidresponsesComponent implements OnInit {

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

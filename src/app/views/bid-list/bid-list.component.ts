import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import { RestApiService } from '../shared/rest-api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'bid-management-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {

  title = 'datatables';
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  viewbiddetail: any;
  posteddate: any;
  duedate: any;
  BidPostedDate: any;
  BidResponseDueDate: any;

  constructor(private http: HttpClient,
    private restApi: RestApiService
) { }

  ngOnInit(): void {
    this.viewbiddetail = [];
    this.GetViewBid1();


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  displayStyle = "none";

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.viewbiddetail);
    });
  }


  openPopup() {
    this.displayStyle = "block";
  }

  closePopup(){
    this.displayStyle = "none";
  }
  GetViewBid1(){
    //  alert("in");

    return this.restApi.GetViewBid().subscribe((viewbiddata: {}) => {
      console.log('hi');
      console.log(viewbiddata);
      this.viewbiddetail = viewbiddata;

      this.viewbiddetail = this.viewbiddetail.ViewBid;
      console.log(this.viewbiddetail);
      this.dtTrigger.next(this.viewbiddetail);

      for (let i = 0; i < this.viewbiddetail.length; i++) {
        this.BidPostedDate = this.viewbiddetail[i].BidPostedDate.split(' ')[0];
        this.BidResponseDueDate = this.viewbiddetail[i].BidResponseDueDate.split(' ')[0];
        //console.log(this.posteddate);
        //console.log(this.duedate);
    }
    });
  }

}

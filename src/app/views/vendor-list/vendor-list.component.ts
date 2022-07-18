import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import { Router,ActivatedRoute,ParamMap, Params, NavigationEnd  } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  // dtOptions: DataTables.Settings = {};
  vendorDetail: any;
  displayStyle = "none";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private http: HttpClient,
    private router:Router,private restApi: RestApiService
    ) {}



  ngOnInit(): void {
    // this.GelAllVendors();
    this.vendorDetail=[];
    this.GelAllVendors1();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
     };
     }

     rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(this.vendorDetail);
      });

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    // };
  }

  // GelAllVendors(){

  //   this.http.get(config_url+'/vendor/GetAllVendors').subscribe( (data: {}) => {
  //       this.vendorDetail=data;
  //       this.vendorDetail=this.vendorDetail.data.VendorList;
  //       // console.log(this.vendorDetail);
  // });
  // }


  GelAllVendors1(){
    //  alert("in");

    return this.restApi.GetAllVendors().subscribe((citylistdata: {}) => {

      console.log("hi");
       this.vendorDetail = citylistdata;

       console.log(this.vendorDetail)
   //console.log("hi")
       this.vendorDetail = this.vendorDetail.VendorList;
       this.dtTrigger.next(this.vendorDetail);

        console.log("vendorDetail test>>>>",this.vendorDetail);
     })

  }

  ViewVendor(vendorid :any)
  {
    localStorage.setItem("vendoridSes",vendorid);
      console.log(vendorid);
      this.router.navigate(['/vendormanagement']);
      // this.router.navigate(['/vendormanagement/'+vendorid]);


  }
  openPopup(){
    this.displayStyle = "block";
  }
  closePopup(){
    this.displayStyle = "none";
  }

}

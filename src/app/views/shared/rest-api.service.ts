import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Customer, shopoffers } from '../shared/customer/customer';

// import {currentuserid,Testimonial,Testimonial2,loginauth,logindetails,singleLoginTestimonial,shopCustlogin,Cartype,Services,ShopService,carbrand,citylist,statelist, shopserviceByModelid, dahsboardShop} from '../shared/customer/customer';

import { Observable, throwError } from 'rxjs';
import { retry, catchError,map } from 'rxjs/operators';
// import { createcustomer } from '../shared/customer/customer';
// import { contactdetails } from '../shared/customer/customer';
import { config_url } from '../shared/constant';

@Injectable({
providedIn: 'root'
})
export class RestApiService {
apiURL = config_url;
constructor(private http:HttpClient) {}
headers = new HttpHeaders().set('Content-Type', 'application/text');
// httpOptions = {
// headers: new HttpHeaders({}),

// }
month=new Array();
year=new Array();
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": "*",

  } ),responseType: 'text' as 'json'
};



GetAllVendors(): Observable<any[]> {
return this.http.get<any[]>(this.apiURL + '/vendor/GetAllVendors')
.pipe(
retry(1),
catchError(this.handleError)
)

}
private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

}

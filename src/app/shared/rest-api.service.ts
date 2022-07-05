import { Injectable } from '@angular/core';
import { config_url } from './constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  apiURL = config_url;

  constructor(private http:HttpClient) { }

  getmasterstatelist:any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
  
    } ),responseType: 'text' as 'json'
  };
}

getmasterstatelist(){

  this.http.get(config_url+'app/selectallstate').subscribe(
              (data: any) => {
            console.log(data)
});

}





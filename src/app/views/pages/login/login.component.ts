import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { IpServiceService } from 'ip-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = {
    UserId: '',
    Password: '',
    IPAddress:''
  };
  ipAddress:any; 
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getIP();  
  }

  getIP()  
  {  
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress=res.ip;  
      console.log("ip>>>",this.ipAddress);
    });
    // this.ip.getIPAddress().subscribe((res:any)=>{  
      
    // });  
  }  

  userLogin() {
    this.loginForm.IPAddress = this.ipAddress;
    console.log(this.loginForm);
    // alert("hi");
    
    (<HTMLInputElement>document.getElementById("invalidid")).innerText = "";
    // alert("hi");
    // console.log(this.loginForm);
    // this.toastr.success('hi');
    if(this.loginForm.UserId == "" && this.loginForm.Password == "") {
      (document.getElementById('invalidid') as HTMLFormElement).innerHTML = "Enter UserId and Password";
      return;
     }
 else if(this.loginForm.UserId == "") {
  (document.getElementById('invalidid') as HTMLFormElement).innerHTML = "Enter UserId";
  return;
 }
 else if(this.loginForm.Password == "") {
  (document.getElementById('invalidid') as HTMLFormElement).innerHTML = "Enter Password";
  return;
 }

 

else {
  //console.log(this.loginForm);
  // alert("in");
    this.http.post("http://localhost/MNC_PHP_API/"+'login/loginauth', this.loginForm).subscribe(
      
      data => {
        console.log("data");
          console.log('POST Request is successful >>>>>>>>', data);
        let data1 = data;
        // const myArray = data1.split("message");
        this.parseJwt(data);

      },
      success => {
        // console.log("success");
        //   console.log('Error>>>>>', success.status);
          // console.log(success.status);
          // if(success.status == 404) {
         
            
          // }
          
//           if(success.status == 404) {
//             let msg = success.error;
//             console.log(msg);
//             // let text = "How are you doing today?";
// const myArray = msg.split("message");
// const secondArr = myArray[1].split(",");
// let str = secondArr[0].substring(3);
// var newStr = str.substring(0, str.length - 1);
// console.log(newStr);
// (document.getElementById('invalidid') as HTMLFormElement).innerHTML = newStr;
//           }
//           else {
//             let msg3 = success.error.text;

// // alert(msg3)
// console.log(success);
// var msg4 = msg3.split("token");
// // alert(msg4);
// var msg5 = msg4[1].replace('"}}}', '');
// var finaltoken = msg5.replace('":"', '');
// var finaltoken1 = finaltoken.replace('"},"data":""}', '');
// console.log("finaltoken1>>>",finaltoken1);
// // alert(finaltoken)
// this.parseJwt(finaltoken1);
// localStorage.setItem('access_token', finaltoken1);
// // alert(success.status);


            
  
//           }
      }
    );
}
  }

  parseJwt (token:any) {
    //alert(token);
    // let token1 = token.split('VERTEX-LMS');
    // alert(token1[1]);
    if(token.includes("VERTEX-LMS") == true) {
      let token1 = token.split('VERTEX-LMS');
      localStorage.setItem("usertypeses", token1[2]);
 
  
  localStorage.setItem("CreatedUseridses", token1[1]);
  localStorage.setItem("Firstnameses", token1[3]);
  localStorage.setItem("LastNameses", token1[4]);
  // localStorage.setItem("Middlenameses", token1[5]);
  if(token1[2] == "EMPLOY"){
  this.router.navigate(['/empdashboard']);
  }
  else {
    this.router.navigate(['/vendordashboard']);
  }

    }
    else {
      (document.getElementById('invalidid') as HTMLFormElement).innerHTML = token;
    }
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
	// var data = JSON.parse(jsonPayload);
  // console.log(data);
  // localStorage.setItem("usertypeses", data['UserTypeId']);
 
  // console.log("datalogin>>>>",data);
  // localStorage.setItem("CreatedUseridses", data['UserId']);
  // this.router.navigate(['/VendorList']);
	// console.log("data>>>>",data['UserId']);
    // return JSON.parse(jsonPayload);
};

EmptyErrorMessage() {
  //   // alert("hi");
    (document.getElementById('invalidid') as HTMLFormElement).innerHTML = "";
   
  }
}

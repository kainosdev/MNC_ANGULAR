import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/constant';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-vendormanagement',
  templateUrl: './vendormanagement.component.html',
  styleUrls: ['./vendormanagement.component.scss'],

})
export class VendormanagementComponent implements OnInit {
  public mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mask1 = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  // public mask1 = ['+',/\d/,'(',/\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  globalStateid:any;
  cityvalbyzipcode:any;
  showadditional:boolean=false;
  statedetailMailAddr:any;
  zipcodeValMailAddr:any;
  countrytypeMailAddr:any;

  countrytypePastAddr:any;
  zipcodeValPastAddr:any;
  statedetailPastAddr:any;

  SingleVendorContactDetailsArr:any;

  CurrentAddrStartDate:any;
  CurrentAddrEndDate:any;
  MailAddrStartDate:any;
  MailAddrEndDate:any;
  PastAddrStartDate:any;
  PastAddrEndDate:any;
  PastAddressDetails:any=[];
  CurrentAddressDetails:any=[];
  MailingAddressDetails:any=[];
  submitted = false;
  submitted1 = false;
  submitted2 = false;
  indsubmitted =false;
  [x: string]: any;
  Vendortypevalue:any;
  classList: any;
  nextElementSibling: any;
  citylist:any;

  zipcodeVal:any;
  countrytype:any;
  districts:any;
  opened = false;
  opened2 = false;
  opened3 = false;
  type:any;
  issubmiited:boolean=false;
  address_submmited:boolean=false;
  contact_submmited:boolean=false;
  date:any;
  VendorMgmtBusiness: any;
  VendorMgmtIndividual:any;
  contactindividual: any;
  generalinformation: any;
  currentaddress: any;
  mailingaddress: any;
  Pastaddress: any;
  // Contactlist: FormArray;
  ContactBusiness: any;
  addtionalcontact: any;
  citytype: any;
  citydata: any
  statelistdata: any;
  AddressTypelist:any;
  mail: any;
  singleVendorDet: any;
  singleVendorAddressDet:any;
  statedetail:any;
  current_date: any;
  from_date: any;
  collapsing = true;
  jobdetail:any;

  IndBusinessPastDistricts:any;
  IndBusinessPastCountry:any;
  IndBusinessPastZipcode:any;
  IndBusinessPastCity:any;
  IndBusinessPastState:any;

  IndBusinessDistrictsNew:any;
  IndBusinessCountryNew:any;
  IndBusinessZipcodeNew:any;
  IndBusinessCityNew:any;
  IndBusinessStateNew:any;


  // final
  indBusMailAddressCityFinal:any;
  indBusMailAddressZipcodeFinal:any;
  indBusMailAddressDistrictFinal:any;
  indBusMailAddressStateFinal:any;
  indBusMailAddressCountryFinal:any;



  indBusPastAddressCityFinal:any;
  indBusPastAddressZipcodeFinal:any;
  indBusPastAddressDistrictFinal:any;
  indBusPastAddressStateFinal:any;
  indBusPastAddressCountryFinal:any;


  contactsform: FormGroup;
  contactList?: FormArray;
  vehicleList?: FormArray;
  AdditionalContactList:any=[];

  ContactToggle : boolean[] = [];
  address_list:any =[];
  contact_list:any =[];
  SingleVendorContactNotPrimary:any;

  ZCSlistdata:any;

  constructor(
    private frmbuilder: FormBuilder,private http: HttpClient,private modalService: NgbModal,
  ) {

    // this.contactsform = this.frmbuilder.group({
    //   contactarray: this.frmbuilder.array([
    //     this.createcontact()
    //   ])
    // });
    // this.contactList = this.contactsform.get('contactarray') as FormArray;
    $('.btn-toggle').click(function() {
      $(this).find('.btn').toggleClass('active');

      if ($(this).find('.btn-primary').length>0) {
        $(this).find('.btn').toggleClass('btn-primary');
      }
      if ($(this).find('.btn-danger').length>0) {
        $(this).find('.btn').toggleClass('btn-danger');
      }
      if ($(this).find('.btn-success').length>0) {
        $(this).find('.btn').toggleClass('btn-success');
      }
      if ($(this).find('.btn-info').length>0) {
        $(this).find('.btn').toggleClass('btn-info');
      }

      $(this).find('.btn').toggleClass('btn-default');

  });
  }

  ngOnInit(): void {
    // debugger
    this.type=localStorage.getItem('vendortype')
    let vendoridSes = localStorage.getItem('vendoridSes');
    console.log(vendoridSes);
    this.getbeclassificationdata();
    this.getAddresstype();
    this.getjobtitledata();
  //  this.getstate_list();
    this.GetVendorById();
    this.GetVendorAddressById();
    this.Getcityall_list();
    this.getAllZipcodes();
    this.getcountrydata();
    this.getAllDistricts();
    this.getstatedata();
    this.GetVendorContactById();
    this.VendorMgmtBusiness = this.frmbuilder.group({
   VendorId:[localStorage.getItem('vendoridSes')],
  CreatedUserId:[localStorage.getItem("CreatedUseridses")],

      UserName :new FormControl({value: '', disabled: true}, Validators.required),
      // active: [],
      VendorTypeId:new FormControl({value: '', disabled: true}, Validators.required),
      //FirstName: ['', [Validators.required]],
      //LastName: ['', [Validators.required]],
      MiddleName: [],
      EIN_SSN: ['', [Validators.required]],

      Phone:[],
      OutreachEmailOptIn:[],

      LegalName: ['', [Validators.required]],
      TradeName: ['', [Validators.required]],
      AliasName:[],
      Federal:[],
      NAICSCodes: ['', [Validators.required]],
      CommodityCodes:['', [Validators.required]],
      BusinessRegisteredInDistrict:[false],
      BusinessRegisteredInSCC:[false],
      BusinessIsFranchisee:[false],
      BusinessSize:['', [Validators.required]],

      DUNS: ['', [Validators.required]],
      Website:['', [Validators.required]],
      BEClassificationId:['', [Validators.required]]


     });


     this.VendorMgmtIndividual = this.frmbuilder.group({

      UserName :new FormControl({value: '', disabled: true}, Validators.required),
      // active: [],
      VendorTypeId:new FormControl({value: '', disabled: true}, Validators.required),

      FirstName:  ['', [Validators.required]],
      LastName:  ['', [Validators.required]],
      MiddleName: ['', [Validators.required]],

      // VendorId:[localStorage.getItem('vendoridSes')],
      // CreatedUserId:[localStorage.getItem("CreatedUseridses")],


      Email: ['', [Validators.required]],

      Phone: ['', [Validators.required]],
      EIN_SSN: ['', [Validators.required]],
      OutreachEmailOptIn:[],



     });

     this.Addressform = this.frmbuilder.group({
      index:0,
      AddressTypeId:[],
      Address1:['', [Validators.required]],
      Address2:[],
      CityId:['', [Validators.required]],
      CountryId:[],
      Zipcode:['', [Validators.required]],
      StartDate:['', [Validators.required]],
      EndDate:['', [Validators.required]],
      DistrictId:[],
      StateId:['', [Validators.required]],
      AddressId:[0],
      VendorAddressPrimary:[0],


    });

    this.Contactform = this.frmbuilder.group({
      index:0,
      FirstName:[],
      LastName:['', [Validators.required]],
      MiddleName:[],
      JobTitleId:['', [Validators.required]],
      Phone:[],
      Email:['', [Validators.required]],
      VendorContactPrimary:[0],
      VendorContactActive:[1],
      ContactId:[0]

    });

  //  this.setUserCategoryValidators();
  this.GetVendorContactByNotPrimary();

  }
  informationPopup(info:any) {
    debugger
    this.informationText = info;
    this.descInfo ='description';
    if(this.descInfo != undefined && this.descInfo != '' && this.descInfo != null)
    {
      this.informationText = this.descInfo;
    }
    this.modalService.dismissAll('');
    this.modalService.open(info, { windowClass: 'info-popup' }).result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.ModalDismissReasons(reason)}`;
    });
  }
  private ModalDismissReasons(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  contactprimarychange(e:any,indexval:any)
  {
    if(e.target.checked)
    {
      this.contact_list.forEach((element:any,index:any) => {
        if(indexval == index)
        {
          element.VendorContactPrimary=1;
        }
        else
        {
          element.VendorContactPrimary=0;
        }

      });
    }
    else
    {
      let already_checked = this.contact_list.filter((y:any) => y.VendorContactPrimary === 1);
      if (already_checked.length > 1)
      {
        if(already_checked.length == 1 && already_checked[0].index == indexval)
        {
          e.target.checked=true;
          this.Contactform.patchValue({VendorContactPrimary:1});
          Swal.fire({
            icon: 'error',
            title: 'Warning!...',
            text: 'Atleast One Address to be Primary Address!',

          })

        }
        else
        {
          this.Contactform.patchValue({VendorContactPrimary:0});
        }

      }
      else
      {
        e.target.checked=true;
        this.Contactform.patchValue({VendorContactPrimary:1});
        Swal.fire({
          icon: 'error',
          title: 'Warning!...',
          text: 'Atleast One Contact to be Primary Contact!',

        })
      }
    }
  }

  addressprimarychange(e:any,indexval:any)
  {
    if(e.target.checked)
    {
      this.address_list.forEach((element:any,index:any) => {
        if(indexval == index)
        {
          element.VendorAddressPrimary=1;
        }
        else
        {
          element.VendorAddressPrimary=0;
        }

      });
    }
    else
    {
      let already_checked = this.address_list.filter((y:any) => y.VendorAddressPrimary === 1);
      if (already_checked.length > 0)
      {
        if(already_checked.length == 1 && already_checked[0].index == indexval)
        {
          e.target.checked=true;
        this.Addressform.patchValue({VendorAddressPrimary:1});
        Swal.fire({
          icon: 'error',
          title: 'Warning!...',
          text: 'Atleast One Address to be Primary Address!',

        })

        }
        else
        {
          this.Addressform.patchValue({VendorAddressPrimary:0});
        }

      }
      else
      {
        e.target.checked=true;
        this.Addressform.patchValue({VendorAddressPrimary:1});
        Swal.fire({
          icon: 'error',
          title: 'Warning!...',
          text: 'Atleast One Address to be Primary Address!',

        })
      }
    }
  }

  onchangecountystatecountry(){

    let zipcode = (<HTMLInputElement>document.getElementById("currentzipcode_id_mailbus")).value;

    this.http.get(config_url+'/app/getCityDistrictStateByZipcode?zipcode='+zipcode).subscribe((data: any) =>
      {
         this.ZCSlistdata=data.cityDistststatedata;
         console.log('alldata-state_country', this.ZCSlistdata)
       })
  }
  toggleContact(i:any) {
    if(this.ContactToggle[i]!=null)
    {
      this.ContactToggle[i] = !this.ContactToggle[i];
    }

  }
  getbeclassificationdata(){
    console.log("in");
    // alert('in');
    this.http.get(config_url+'/app/selectBEClassification').subscribe(
      (data: any) => {


        this.beclassificationdetail = data.BEClassification
        // console.log("country",countrydata)
  });
  }
  getAddresstype(){

    this.http.get(config_url+'/app/AddressType').subscribe(
      (data: any) => {


        this.AddressTypelist = data.AddressType
        // console.log("country",countrydata)
  });
  }
  canceladdress()
  {
    this.Addressform.reset()
    var indexval=this.address_list.length;
    this.Addressform.patchValue({
      index:indexval
    })
     this.address_submmited=false;
  }

  addaddress(index:any)
  {

      debugger

      if (this.Addressform.valid) {


      this.Addressform.value.VendorId=localStorage.getItem('vendoridSes');
      this.Addressform.value.CreatedUserId=localStorage.getItem("CreatedUseridses");
      this.http.post('http://localhost/MNC_PHP_API/vendor/UpdVendorNew',this.Addressform.value).subscribe(
        data => {
          console.log("data");
            console.log('POST Request is successful >>>>>>>>', data);

        },
        success => {
          this.GetVendorAddressById()
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Address Successfully Updated',
            showConfirmButton: false,
            timer: 3000
          })
        }
        );
      }
    // this.address_submmited=true;
    // if (this.Addressform.invalid)
    // {
    //     return;
    // }
    // else
    // {

    //   let addresstype = this.AddressTypelist.filter((y:any) => y.AddressTypeId === this.Addressform.value.AddressTypeId);
    //   if (addresstype.length > 0)
    //   {
    //      this.Addressform.value.AddressTypeDesc=addresstype[0].AddressTypeDesc;
    //   }


    //   let city = this.citylist.filter((y:any) => y.CityId === this.Addressform.value.CityId);
    //   if (city.length > 0)
    //   {
    //      this.Addressform.value.CityName=city[0].CityName;
    //   }

    //   let district = this.ZCSlistdata.filter((y:any) => y.DistrictId === this.Addressform.value.DistrictId);
    //   if (district.length > 0)
    //   {
    //      this.Addressform.value.DistrictName=district[0].DistrictName;
    //   }


    //   let state = this.ZCSlistdata.filter((y:any) => y.StateId === this.Addressform.value.StateId);
    //   if (state.length > 0)
    //   {
    //      this.Addressform.value.StateName=state[0].StateName;
    //   }

    //   let country = this.ZCSlistdata.filter((y:any) => y.CountryId === this.Addressform.value.CountryId);
    //   if (country.length > 0)
    //   {
    //      this.Addressform.value.CountryName=country[0].CountryName;
    //   }



    // // this.address_list.splice( index, 0, this.Addressform.value );
    // //   this.addlistToarray(this.Addressform.value,this.address_list)
    // // this.address_list.push(this.Addressform.value)
    // this.addlistToarray(this.Addressform.value,this.address_list)
    // // this.contact_list.splice( index, 0, this.Contactform.value );
    // //this.contact_list.push(this.Contactform.value)
    // this.Addressform.reset()
    // var indexval=this.address_list.length;
    // this.Addressform.patchValue({
    //   index:indexval
    // })
    // // this.Addressform.reset()
    //  this.address_submmited=false;
    // }
  }
  addlistToarray(obj:any,list:any) {
    let elmIndex = -1;
    const found = list.some((el:any, index:any) => {
      elmIndex = index;
      return el.index === obj.index;
    })
    if (!found){
      list.push(obj);
    } else{
      list[elmIndex] = obj;
    }
  }
  editaddress(data:any,i:any)
  {
    // debugger
   // this.address_list.splice(i,1);
    this.Addressform.patchValue({
      index:i,
      AddressId : data.AddressId,
      AddressTypeId :data.AddressTypeId,
      Address1:data.Address1,
      Address2:data.Address2,
      CityId:data.CityId,
      Zipcode:data.Zipcode,
      CountryId: data.CountryId,
      DistrictId: data.DistrictId,
      StateId:data.StateId,
      StartDate: data.StartDate.split(' ')[0],
      EndDate:data.EndDate.split(' ')[0],


   });
   this.onchangecountystatecountry();

  }
  deleteaddress(i:any)
  {
    this.address_list.splice(i,1);
  }
  editcontact(data:any,i:any)
  {

   // this.contact_list.splice(i,1);
    this.Contactform.patchValue({
      index:i,
      FirstName:data.FirstName,
      LastName:data.LastName,
      MiddleName:data.MiddleName,
      JobTitleId:data.JobTitleId,
      Phone:data.Phone,
      Email:data.Email,
      VendorContactPrimary:data.VendorContactPrimary,
      VendorContactActive:data.VendorContactActive,
      ContactId:data.ContactId

   });

  }
  deletecontact(i:any)
  {
    this.contact_list.splice(i,1);
  }

  getjobtitledata(){
        this.http.get(config_url+'/employee/selectJobTitle').subscribe( (data:any) => {
        // this.jobtitle=data;
        // this.jobdetail=this.jobtitle.data.JobTitle;
        this.jobdetail=data.JobTitle;
       });
  }
  cancelcontact()
  {
    this.Contactform.reset()
    var indexval=this.contact_list.length;
    this.Contactform.patchValue({
      index:indexval
    })

    this.contact_submmited=false;
  }
  addcontact(index:any)
  {
    // debugger


    this.contact_submmited=true;
    if (this.Contactform.invalid)
    {
        return;
    }
    else
    {
      let jobtitle = this.jobdetail.filter((y:any) => y.JobTitleId === this.Contactform.value.JobTitleId);
      if (jobtitle.length > 0)
      {
         this.Contactform.value.JobTitleDesc=jobtitle[0].JobTitleDesc;
      }
      this.addlistToarray(this.Contactform.value,this.contact_list)
     // this.contact_list.splice( index, 0, this.Contactform.value );
     //this.contact_list.push(this.Contactform.value)
     this.Contactform.reset()
     var indexval=this.contact_list.length;
     this.Contactform.patchValue({
       index:indexval
     })

     this.contact_submmited=false;

    }
  }
  removeContact(index:any,contactsform:any) {

    // console.log(this.ContactToggle);

    if(contactsform.contactarray[index].ContactId==0)
    {
      console.log(contactsform[index]);
      if(this.ContactToggle!=null)
      {
        this.ContactToggle.splice(index, 1);
      }
      if(this.contactList!=null)
      {
        this.contactFormGroup.removeAt(index);
      }
    }
    else
    {

    // contactsform = contactsform.contactarray[index];
    contactsform.contactarray[index].VendorId = localStorage.getItem('vendoridSes');
    // contactsform.VendorId = "test";
    // console.log(contactsform.contactarray[index].VendorId);

    this.http.post('http://localhost:8080/vendor/DeleteVendorContact',contactsform.contactarray[index]).subscribe(
    // // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(

      data => {
        console.log("data");
          console.log('POST Request is successful >>>>>>>>', data);
          console.log(contactsform[index]);
          if(this.ContactToggle!=null)
          {
            this.ContactToggle.splice(index, 1);
          }
          if(this.contactList!=null)
          {
            this.contactFormGroup.removeAt(index);
          }
      },
      success => {
        // Swal.fire({
        //   position: 'top',
        //   icon: 'success',
        //   title: 'Successfully Registered',
        //   showConfirmButton: false,
        //   timer: 3000
        // })
      }
      );
    }



  }


  createcontact1(ContactName:any,JobTitle:any,Email:any,Phone:any,VendorContactActive:any,ContactId:any): FormGroup {
    return this.frmbuilder.group({
      AddtionalName: [ContactName],
      AddtionalTitle: [JobTitle],
      AddtionalBusinessMail: [Email],
      AddtionalBusinessPhone: [Phone],
      AddtionalContactActive:[VendorContactActive],
      ContactId:[ContactId],
    });
  }

  createcontact(): FormGroup {
    return this.frmbuilder.group({
      AddtionalName: ['', [Validators.required]
        //'', [Validators.required]
      ],
      AddtionalTitle: ['', [Validators.required]],
      AddtionalBusinessMail: ['', [Validators.required]],
      AddtionalBusinessPhone: ['', [Validators.required]],
      AddtionalContactActive:[],
      ContactId:[0]
    });
  }

  addcontact2() {

    // debugger

    if(this.contactList==null)
    {
      this.contactsform = this.frmbuilder.group({
        contactarray: this.frmbuilder.array([this.createcontact()])
      });
      this.contactList = this.contactsform.get('contactarray') as FormArray;
      this.showadditional=true;
    }
    else
    {
      if(this.contactFormGroup!=null)
      {

        //this.ContactToggle[i]=true;
        //this.toggleContact(i)
        this.contactFormGroup.push(this.createcontact());

      }
    }



  }

  savecontact(i:any) {


      this.ContactToggle[i]=true;
      // console.log(this.contactList);
      //this.toggleContact(i)


  }

  get contactFormGroup() {
    return this.contactsform.get('contactarray') as FormArray;
  }
  get cfc() {
    return this.contactsform.controls;
  }
  setUserCategoryValidators() {
//     this.VendorMgmtIndividual.get("IMAddress1").clearValidators([Validators.required]);//clear validation
// this.VendorMgmtIndividual.get("IMAddress1").setErrors(null);//updating error message
// this.VendorMgmtIndividual.updateValueAndValidity();//update validation
    // alert("in");
    // let IMAddress1_ind = this.VendorMgmtIndividual.get('IMAddress1').value;
    // alert(IMAddress1_ind);
    // this.VendorMgmtIndividual.controls.IMAddress1.setValue= "";
    // this.VendorMgmtIndividual.controls["IMAddress1"].setValidators([Validators.required]);
    // this.VendorMgmtIndividual.get('IMAddress1').setValidators([Validators.required])
    //
    //


    // this.VendorMgmtIndividual.get('IMCityId').valueChanges
    //   .subscribe((IMCityId: any) => {

    //     if (IMCityId != null) {
    //       IMAddress1.setValidators([Validators.required]);

    //     }


    //   });
  }

  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  phoneformat= /^[0-9]{10}$/;
  socialno = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;




  // get rcf() {
  //   return this.vendorMgmt.controls;
  // }

  alpha(event: any){
    var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z]/.test(inp) || event.keyCode==32) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
  }
  alphanumeric(event: any){
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  number(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }




  is_business:any = "individual";


//  ssnformat = /^ [0-9] {3}-? [0-9] {2}-? [0-9] {4}$/;

VendorData(VendorMgmtIndividual:any){
// debugger;


// (<any>Object).values(VendorMgmtIndividual.controls).forEach((control: { markAsDirty: () => void; }) => {
//   control.markAsDirty();  // or control.markAsTouched();
// });

// this.VendorMgmtIndividual
// if(!this.VendorMgmtIndividual.dirty){

// // this.VendorMgmtIndividual.controls.forEach((element:any,i:any) => {
// //   if (element.value)
// //   {

//     this.VendorMgmtIndividual.markAllAsTouched();


//   // }
// // });
// }

  this.submitted1 = true;
  console.log('VendorMgmtIndividual',VendorMgmtIndividual);
  // this.setUserCategoryValidators();
  this.http.post('http://localhost:8080/vendor/UpdateVendor',VendorMgmtIndividual).subscribe(
    // // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(

      data => {
        console.log("data");

          console.log('POST Request is successful >>>>>>>>', data);

      },
      success => {
        // Swal.fire({
        //   position: 'top',
        //   icon: 'success',
        //   title: 'Successfully Registered',
        //   showConfirmButton: false,
        //   timer: 3000
        // })
      }
      );
}


businessUserdata(vendorMgmt:any){
  debugger

    this.submitted2 = true;
    this.issubmiited=true;
    if (this.VendorMgmtBusiness.valid) {
      vendorMgmt.Newcontact = this.contact_list;
      vendorMgmt.Address = this.address_list;


    this.http.post('http://localhost/MNC_PHP_API/vendor/UpdVendorNew',vendorMgmt).subscribe(
    // // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(

      data => {
        console.log("data");
          console.log('POST Request is successful >>>>>>>>', data);

      },
      success => {
        // Swal.fire({
        //   position: 'top',
        //   icon: 'success',
        //   title: 'Successfully Registered',
        //   showConfirmButton: false,
        //   timer: 3000
        // })
      }
      );
    }


 }

 individualUserdata(vendorMgmt:any){
  // debugger
  this.indsubmitted = true;
  this.issubmiited=true;
  if (this.VendorMgmtIndividual.valid) {
    vendorMgmt.Newcontact = this.contact_list;
    vendorMgmt.Address = this.address_list;


  this.http.post('http://localhost/MNC_PHP_API/vendor/UpdVendorNew',vendorMgmt).subscribe(
  // // this.http.post("http://localhost/VERTEX-PHP-API/"+'vendor/UpdateVendor',vendorMgmt).subscribe(

    data => {
      console.log("data");
        console.log('POST Request is successful >>>>>>>>', data);

    },
    success => {
      // Swal.fire({
      //   position: 'top',
      //   icon: 'success',
      //   title: 'Successfully Registered',
      //   showConfirmButton: false,
      //   timer: 3000
      // })
    }
    );
  }


}

EmptyErrorMessage(errormessage: any) {

  (document.getElementById(errormessage) as HTMLFormElement).classList.remove("validation");

  }

  // EmptyErrorMessage1(email_idmsg: any) {

  //   (document.getElementById(email_idmsg) as HTMLFormElement).innerHTML = "";

  //   }





Displayvendortype(){
  // alert(this.Vendortypevalue);

  let vendor_details = (<HTMLInputElement>document.getElementById("vendortypeactive")).checked;
  console.log(vendor_details);
  // alert(vendor_details);
 if(vendor_details == true){
  // alert("in");
  this.Vendortypevalue='B';
// this.is_business = 'business';

//      (<HTMLInputElement>document.getElementById("General_Information")).style.display ="block";
//     (<HTMLInputElement>document.getElementById("currentaddress")).style.display ="block";
//     (<HTMLInputElement>document.getElementById("addtionaddress")).style.display ="block";
//     (<HTMLInputElement>document.getElementById("contact_inforation")).style.display ="block";
//     (<HTMLInputElement>document.getElementById("vendor-individual")).style.display ="none";

  }
  else{
    this.Vendortypevalue='I';

    // this.is_business = 'individual';
    // (<HTMLInputElement>document.getElementById("vendor-individual")).style.display ="block";
    // (<HTMLInputElement>document.getElementById("currentaddress")).style.display ="block";
    // (<HTMLInputElement>document.getElementById("addtionaddress")).style.display ="block";
    // (<HTMLInputElement>document.getElementById("contact_inforation")).style.display ="none";
    // (<HTMLInputElement>document.getElementById("General_Information")).style.display ="none";

  }
  this.Displayvendortype();

}

display_addresstype(addresstype:any){
  // addressheading
  if(addresstype == "mail"){

    (<HTMLInputElement>document.getElementById("mailing_type")).style.display ="block";
    (<HTMLInputElement>document.getElementById("past_type")).style.display ="none";

  }
  else {

    (<HTMLInputElement>document.getElementById("past_type")).style.display ="block";
    (<HTMLInputElement>document.getElementById("mailing_type")).style.display ="none";
  }

}


display_addresstypeIndividual(addresstype:any){
  if(addresstype == "mail"){

    (<HTMLInputElement>document.getElementById("MailingAddressIndividual")).style.display ="block";
    (<HTMLInputElement>document.getElementById("PastAddressIndividual")).style.display ="none";

  }
  else {

    (<HTMLInputElement>document.getElementById("PastAddressIndividual")).style.display ="block";
    (<HTMLInputElement>document.getElementById("MailingAddressIndividual")).style.display ="none";
  }
}


display_addresstypeBusiness(addresstype:any){
  if(addresstype == "mail"){

    (<HTMLInputElement>document.getElementById("MailingAddressBusiness")).style.display ="block";
    (<HTMLInputElement>document.getElementById("PastAddressBusiness")).style.display ="none";

  }
  else {

    (<HTMLInputElement>document.getElementById("PastAddressBusiness")).style.display ="block";
    (<HTMLInputElement>document.getElementById("MailingAddressBusiness")).style.display ="none";
  }
}

// Address_swipingIndividual(){
//   //alert("in");

//       let individualMailQn = (<HTMLInputElement>document.getElementById("individualMailQn")).checked;
//       // alert(individualMailQn);
//       if(individualMailQn == true){
//         // alert(this.VendorMgmtIndividual.get('Address1').value)
//         this.VendorMgmtIndividual.controls.IMAddress1.setValue(this.VendorMgmtIndividual.get('Address1').value);
//         this.VendorMgmtIndividual.controls.IMAddress2.setValue(this.VendorMgmtIndividual.get('Address2').value);
//         this.VendorMgmtIndividual.controls.IMCityId.setValue(this.VendorMgmtIndividual.get('CityId').value);
//         this.VendorMgmtIndividual.controls.IMCountryId.setValue(this.VendorMgmtIndividual.get('CountryId').value);
//         this.VendorMgmtIndividual.controls.IMZipcode.setValue(this.VendorMgmtIndividual.get('Zipcode').value);
//         this.VendorMgmtIndividual.controls.IMStartDate.setValue(this.VendorMgmtIndividual.get('StartDate').value);
//         this.VendorMgmtIndividual.controls.IMEndDate.setValue(this.VendorMgmtIndividual.get('EndDate').value);
//         this.VendorMgmtIndividual.controls.IMDistrictId.setValue(this.VendorMgmtIndividual.get('DistrictId').value);
//         this.VendorMgmtIndividual.controls.IMStateId.setValue(this.VendorMgmtIndividual.get('StateId').value);

//  }
//  else{

//   this.VendorMgmtIndividual.controls.IMAddress1.setValue("");
//   this.VendorMgmtIndividual.controls.IMAddress2.setValue("");
//   this.VendorMgmtIndividual.controls.IMCountryId.setValue("");
//   this.VendorMgmtIndividual.controls.IMCityId.setValue("");
//   this.VendorMgmtIndividual.controls.IMZipcode.setValue("");
//   this.VendorMgmtIndividual.controls.IMStartDate.setValue("");
//   this.VendorMgmtIndividual.controls.IMEndDate.setValue("");
//   this.VendorMgmtIndividual.controls.IMDistrictId.setValue("");
//   this.VendorMgmtIndividual.controls.IMStateId.setValue("");
//  }
// }


// Address_swipingBusiness(){
//   //alert("in");

//       let individualMailQn = (<HTMLInputElement>document.getElementById("BusinessMailQn")).checked;
//       // alert(individualMailQn);
//       if(individualMailQn == true){
//         // alert(this.VendorMgmtIndividual.get('Address1').value)
//         this.VendorMgmtBusiness.controls.BMAddress1.setValue(this.VendorMgmtBusiness.get('Address1').value);
//         this.VendorMgmtBusiness.controls.BMAddress2.setValue(this.VendorMgmtBusiness.get('Address2').value);
//         this.VendorMgmtBusiness.controls.BMCityId.setValue(this.VendorMgmtBusiness.get('CityId').value);
//         this.VendorMgmtBusiness.controls.BMCountryId.setValue(this.VendorMgmtBusiness.get('CountryId').value);
//         this.VendorMgmtBusiness.controls.BMZipcode1.setValue(this.VendorMgmtBusiness.get('Zipcode').value);
//         this.VendorMgmtBusiness.controls.BMStartDate.setValue(this.VendorMgmtBusiness.get('StartDate').value);
//         this.VendorMgmtBusiness.controls.BMEndDate.setValue(this.VendorMgmtBusiness.get('EndDate').value);
//         this.VendorMgmtBusiness.controls.BMDistrictId.setValue(this.VendorMgmtBusiness.get('DistrictId').value);
//         this.VendorMgmtBusiness.controls.BMStateId1.setValue(this.VendorMgmtBusiness.get('StateId').value);

//  }
//  else{

//   this.VendorMgmtBusiness.controls.BMAddress1.setValue("");
//   this.VendorMgmtBusiness.controls.BMAddress2.setValue("");
//   this.VendorMgmtBusiness.controls.BMCountryId.setValue("");
//   this.VendorMgmtBusiness.controls.BMCityId.setValue("");
//   this.VendorMgmtBusiness.controls.BMZipcode1.setValue("");
//   this.VendorMgmtBusiness.controls.BMStartDate.setValue("");
//   this.VendorMgmtBusiness.controls.BMEndDate.setValue("");
//   this.VendorMgmtBusiness.controls.BMDistrictId.setValue("");
//   this.VendorMgmtBusiness.controls.BMStateId1.setValue("");
//  }
// }


GetVendorById(){

  let vendoridSes = localStorage.getItem('vendoridSes');

  this.http.get(config_url+'/vendor/GetVendorById?VendorId='+vendoridSes).subscribe((data:any) =>
    {

      var response= data.SingleVendorDetails;
      if(response != null && response.length>0)
      {
        var details = response[0];
        this.type=localStorage.getItem('vendortype')

        if(this.type == "I")
        {

            this.VendorMgmtIndividual.patchValue({

            UserName :details.TradeName,
            // active: [],
            VendorTypeId:details.VendorTypeId =="B"?"Business":"Individual",

            FirstName: details.LegalName,
            LastName:details.LegalName,
            MiddleName:details.AliasName,

            VendorId:[localStorage.getItem('vendoridSes')],
            CreatedUserId:[localStorage.getItem("CreatedUseridses")],


            Email:details.Email,

            Phone:details.Phone,
            EIN_SSN:details.EIN_SSN,
            OutreachEmailOptIn:details.OutreachEmailOptIn,



           });

        }
        else if(this.type == "B")
        {
          this.VendorMgmtBusiness.patchValue({

            UserName :details.TradeName,
            EIN_SSN:details.EIN_SSN,
            // active: [],VendorTypeId
            BEClassificationId:details.BEClassificationId,
            VendorTypeId:details.VendorTypeId =="B"?"Business":"Individual",
            LegalName: details.LegalName,
            TradeName: details.TradeName,
            AliasName:details.AliasName,
            DUNS: details.DUNS,

            NAICSCodes:details.NAICSCodes,
            CommodityCodes:details.CommodityCodes,
            BusinessSize:details.BusinessSize,
            Website:details.Website,

            BusinessRegisteredInDistrict:details.BusinessRegisteredInDistrict,
            BusinessRegisteredInSCC:details.BusinessRegisteredInSCC,
            BusinessIsFranchisee:details.BusinessIsFranchisee,


         });
        }

      }

      // this.singleVendorDet=data1;
      // this.singleVendorDet=this.singleVendorDet.SingleVendorDetails;
      // console.log("singleVendorDet>>>",this.singleVendorDet);
      // this.Vendortypevalue=this.singleVendorDet[0].VendorTypeId;
      // if(this.Vendortypevalue == "B"){
      //   (<HTMLInputElement>document.getElementById("vendortypeactive")).checked = true;
      // }else {
      //   (<HTMLInputElement>document.getElementById("vendortypeactive")).checked = false;
      // }
      //alert(this.Vendortypevalue);

      // console.log( 'singleVendorDet', this.singleVendorDet);
      // alert(this.singleVendorDet[0]["VendorTypeId"]);
      // if(this.singleVendorDet[0]["VendorTypeId"] == "B") {
      //   // alert("in")
      //   this.is_business = 'business';
      //   (<HTMLInputElement>document.getElementById("active")).checked = true;
      //   this.Displayvendortype();
      // }
      // else {
      //   this.is_business = 'individual';
      //   (<HTMLInputElement>document.getElementById("active")).checked = false;
      //   // this.Displayvendortype();
      // }
      // console.log(this.singleVendorDet[0].OutreachEmailOptIn)
    })

}

GetVendorAddressById(){

  // debugger
  let vendoridSes = localStorage.getItem('vendoridSes');
  // let vendoridSes = "BC75E529-1F26-4993-9469-2797493CD645";
  this.http.get(config_url+'vendor/GetVendorAddressById?VendorId='+vendoridSes+"&").subscribe((data:any) =>
    {
      var response= data.SingleVendorAddressDetails;
      if(response != null && response.length>0)
      {
        this.address_list=response;

        this.address_list.forEach((element:any,index:any) => {
          element.index=index;
        });
        var indexval=response.length+1;
        this.Addressform.patchValue({
          index:indexval
        })
      }
      console.log("AddressList>>>",this.address_list);
      // console.log(data1);
      // this.singleVendorAddressDet=data1;
      // this.singleVendorAddressDet=this.singleVendorAddressDet.SingleVendorAddressDetails;

      // // this.singleVendorAddressDet[0].StartDate = this.singleVendorAddressDet[0].StartDate.split(" ")[0];

      // // this.singleVendorAddressDet[0].EndDate = this.singleVendorAddressDet[0].EndDate.split(" ")[0];
      // console.log( 'singleVendorAddressDet', this.singleVendorAddressDet);
      // console.log(this.StartDate);

      // for(let i=0;i<this.singleVendorAddressDet.length;i++){
      //   // alert(this.singleVendorAddressDet[i].AddressTypeId)
      //   if(this.singleVendorAddressDet[i].AddressTypeId == "C") {
      //     this.CurrentAddressDetails = this.singleVendorAddressDet[i];
      //     this.CurrentAddrStartDate = this.singleVendorAddressDet[i].StartDate.split(" ")[0];
      //     this.CurrentAddrEndDate = this.singleVendorAddressDet[i].EndDate.split(" ")[0];
      //   }
      //   if(this.singleVendorAddressDet[i].AddressTypeId == "M") {
      //     this.MailingAddressDetails = this.singleVendorAddressDet[i];
      //     this.MailAddrStartDate = this.singleVendorAddressDet[i].StartDate.split(" ")[0];
      //     this.MailAddrEndDate = this.singleVendorAddressDet[i].EndDate.split(" ")[0];
      //   }
      //   if(this.singleVendorAddressDet[i].AddressTypeId == "P") {
      //     this.PastAddressDetails = this.singleVendorAddressDet[i];
      //     this.PastAddrStartDate = this.singleVendorAddressDet[i].StartDate.split(" ")[0];
      //     this.PastAddrEndDate = this.singleVendorAddressDet[i].EndDate.split(" ")[0];
      //   }
      // }
      // console.log("this.CurrentAddressDetails",this.CurrentAddressDetails);
      // console.log("this.MailingAddressDetails",this.MailingAddressDetails);
      // console.log("this.PastAddressDetails",this.PastAddressDetails);


    })

}
  StartDate(StartDate: any) {
    throw new Error('Method not implemented.');
  }

Getcityall_list(){
// debugger
  console.log('in');
  // alert('in');

  this.http.get(config_url+'/app/selectAllcity').subscribe(
        (citylist: {}) => {
        //  console.log( 'citylist', citylist);

          this.citylist=citylist;

          this.IndBusinessCityNew=this.citylist.citydetails;

          this.IndBusinessPastCity=this.citylist.citydetails;

          // final
          this.indBusMailAddressCityFinal = this.citylist.citydetails;
          console.log("mail addr city>>>",this.indBusMailAddressCityFinal)

          this.indBusPastAddressCityFinal = this.citylist.citydetails;


           this.citylist=this.citylist.citydetails;
          //  console.log(this.citylist)


        });

}

getAllZipcodes(){

  console.log('in');
  // alert('in');
  this.http.get(config_url+'/app/getZipCode').subscribe( (data: {}) => {
      this.zipcodeVal=data;

      this.IndBusinessZipcodeNew=this.zipcodeVal.zipcodedata;

      this.IndBusinessPastZipcode=this.zipcodeVal.zipcodedata;



       // final
       this.indBusMailAddressZipcodeFinal=this.zipcodeVal.zipcodedata;

       this.indBusPastAddressZipcodeFinal=this.zipcodeVal.zipcodedata;

      this.zipcodeVal=this.zipcodeVal.zipcodedata;
        // console.log(this.zipcodeVal);



});
}

getcountrydata(){
  this.http.get(config_url+'/app/selectAllCountry').subscribe(
    (countrydata: {}) => {

      this.countrytype = countrydata;

      this.IndBusinessCountryNew = this.countrytype.CountryDetails;

      this.IndBusinessPastCountry = this.countrytype.CountryDetails;

      // final
      this.indBusMailAddressCountryFinal = this.countrytype.CountryDetails;

      this.indBusPastAddressCountryFinal = this.countrytype.CountryDetails;

      this.countrytype = this.countrytype.CountryDetails;

      // console.log("country",countrydata)



});
}

getAllDistricts(){
  this.http.get(config_url+'/app/selectAllDistricts').subscribe(
    (data: {}) => {

      this.districts = data;

      this.IndBusinessDistrictsNew = this.districts.selectAllDistricts;

      this.IndBusinessPastDistricts = this.districts.selectAllDistricts;

      // final
      this.indBusMailAddressDistrictFinal = this.districts.selectAllDistricts;

      this.indBusPastAddressDistrictFinal = this.districts.selectAllDistricts;

      this.districts = this.districts.selectAllDistricts;

      // console.log("districts",this.districts);



});
}

getstatedata(){

  this.http.get(config_url+'/app/selectAllState').subscribe(
    (statelistdata: {}) => {

      this.statedetail = statelistdata;

      this.IndBusinessStateNew = this.statedetail.statedetails;

      this.IndBusinessPastState = this.statedetail.statedetails;

      // finall
      this.indBusMailAddressStateFinal = this.statedetail.statedetails;

      this.indBusPastAddressStateFinal = this.statedetail.statedetails;

      this.statedetail = this.statedetail.statedetails;
      console.log("state",this.statedetail)


});
}

cancelform()
  {
    this.submitted=false;
  }

  cancelform1()
  {
    this.submitted1=false;
  }

  cancelform2()
  {
    this.submitted2=false;
  }

  get rcf1() {
    return this.VendorMgmtIndividual.controls;
  }

  get rcf2() {
    return this.VendorMgmtBusiness.controls;
  }

  get vifc() {
    return this.VendorMgmtIndividual.controls;
  }

  get af() {
    return this.Addressform.controls;
  }
  get cf() {
    return this.Contactform.controls;
  }

  // get rcf3() {
  //   return this.contactsform.controls;
  // }

  inputErrorMessage(errormessage: any) {

    //(document.getElementById(errormessage) as HTMLFormElement).classList.remove("validation");

    }

    inputErrorMessage1(errormessage: any) {

      //(document.getElementById('passvalidationid') as HTMLFormElement).innerText = 'Passwords must match.!'

      }


      onchangezip(){
// alert("in");
        let cityid = (<HTMLInputElement>document.getElementById("currentcity_id")).value;

        this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
          {

            this.zipcodeVal=data1;
            this.zipcodeVal=this.zipcodeVal.zipcodedata;
           })

      }

      onchangestate(){

        let cityid = (<HTMLInputElement>document.getElementById("currentcity_id")).value;

        this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
          {

            console.log(statelist);
            this.statedetail=statelist;
            this.statedetail=this.statedetail.Statelist;
           })

      }

      onchangecountry(){
        // alert("in");

        let state_id = (<HTMLInputElement>document.getElementById("stateprovice_id")).value;

        this.http.get(config_url+'/app/getCountryByState?stateid='+state_id).subscribe(countrydata =>
          {
 this.countrytype = countrydata;
            this.countrytype = this.countrytype.countrydata
          })


      }

// for both mail address
      onchangeMailzipIndBus(){
        // alert("in");
      //   this.IndBusinessPastZipcode="";
                let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_mailInd")).value;

                this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
                  {

                    this.zipcodeValMailAddr=data1;
                    this.indBusMailAddressZipcodeFinal=this.zipcodeValMailAddr.zipcodedata;
                   })

              }

              onchangeMailstateIndBus(){
                // alert("in");
      //           this.IndBusinessPastState="";
                let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_mailInd")).value;

                this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailMailAddr=statelist;
                    this.indBusMailAddressStateFinal=this.statedetailMailAddr.Statelist;
                   })

              }

              onchangeMailcountryIndBus(){
      //           // alert("in");

                let state_id = (<HTMLInputElement>document.getElementById("stateprovice_id_mailInd")).value;

                this.http.get(config_url+'/app/getCountryByState?stateid='+state_id).subscribe(countrydata =>
                  {
         this.countrytypeMailAddr = countrydata;
                    this.IndBusinessPastCountry = this.countrytypeMailAddr.countrydata
                    console.log(this.IndBusinessPastCountry);
                    this.indBusMailAddressCountryFinal=this.countrytypeMailAddr.countrydata;
                  })


              }
// for both mail address



// for both past address
onchangezipPastAddr(){
  // alert("in");
//   this.IndBusinessPastZipcode="";
          let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_Past")).value;

          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {

              this.zipcodeValPastAddr=data1;
              this.indBusPastAddressZipcodeFinal=this.zipcodeValPastAddr.zipcodedata;
             })

        }

        onchangestatePastAddr(){
          // alert("in");
//           this.IndBusinessPastState="";
          let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_Past")).value;

          this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
            {

              // console.log(statelist);
              this.statedetailPastAddr=statelist;
              this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
             })

        }

        onchangecountryPastAddr(){
//           // alert("in");

          let state_id = (<HTMLInputElement>document.getElementById("stateprovice_id_past")).value;

          this.http.get(config_url+'/app/getCountryByState?stateid='+state_id).subscribe(countrydata =>
            {
   this.countrytypePastAddr = countrydata;
              this.indBusPastAddressCountryFinal = this.countrytypePastAddr.countrydata
              console.log(this.IndBusinessCountryNew);
            })


        }
// for both past address

GetVendorContactById(){
//  debugger
  let vendoridSes = localStorage.getItem('vendoridSes');

  this.http.get(config_url+'vendor/GetVendorContactById?VendorId='+vendoridSes
  //  +"&VendorContactActive=1"
  ).subscribe((data:any) =>
    {
      var response= data.SingleVendorContactDetails;
      if(response != null && response.length>0)
      {

        this.contact_list=response;
        this.contact_list.forEach((element:any,index:any) => {
          element.index=index;
        });
        var indexval=response.length+1;
        this.Contactform.patchValue({
          index:indexval
        })
      }
      console.log("contactlist>>>",this.contact_list);

      // this.SingleVendorContactDetailsArr=data1;
      // this.SingleVendorContactDetailsArr=this.SingleVendorContactDetailsArr.SingleVendorContactDetails;
      // console.log("SingleVendorContactDetailsArr>>>",this.SingleVendorContactDetailsArr);

    })

}


GetVendorContactByNotPrimary(){

  let vendoridSes = localStorage.getItem('vendoridSes');

  this.http.get(config_url+'/app/getVContactNotPrimary?VendorId='+vendoridSes+"&VendorContactPrimary=0").subscribe(data1 =>
    {


      this.SingleVendorContactNotPrimary=data1;
      this.SingleVendorContactNotPrimary=this.SingleVendorContactNotPrimary.VendorContact;
      console.log("SingleVendorContactNotPrimary>>>",this.SingleVendorContactNotPrimary);
      // alert(this.SingleVendorContactNotPrimary.length);
      let array = [];

      if(this.SingleVendorContactNotPrimary.length >0)
      {
        if(this.contactList==null)
        {
          this.contactsform = this.frmbuilder.group({
            contactarray: this.frmbuilder.array([this.createcontact()])
          });
          this.contactList = this.contactsform.get('contactarray') as FormArray;
          this.showadditional=true;
        }
        for(let i=0;i<this.SingleVendorContactNotPrimary.length;i++){
          // debugger
           array.push(
           this.frmbuilder.group({
             AddtionalName: [this.SingleVendorContactNotPrimary[i].ContactName],
             AddtionalTitle: [this.SingleVendorContactNotPrimary[i].JobTitle],
             AddtionalBusinessMail: [this.SingleVendorContactNotPrimary[i].Email],
             AddtionalBusinessPhone: [this.SingleVendorContactNotPrimary[i].Phone],
             AddtionalContactActive:[this.SingleVendorContactNotPrimary[i].VendorContactActive],
             ContactId:[this.SingleVendorContactNotPrimary[i].ContactId]

           }))
      }
      const FormArray: FormArray = this.frmbuilder.array(array);
      this.contactsform.setControl('contactarray', FormArray);
      this.showadditional=true;
      }

// alert(this.SingleVendorContactNotPrimary.length);
      if(this.SingleVendorContactNotPrimary.length == 0){
    //     alert("in")
    //     this.contactsform = this.frmbuilder.group({
    //   contactarray: this.frmbuilder.array([
    //    this.createcontact()
    //   ])
    // });
    // this.contactList = this.contactsform.get('contactarray') as FormArray;


        // this.contactsform = this.frmbuilder.group({
        //   contactarray: this.frmbuilder.array([
        //     this.createcontact()
        //   ])
        // });
      //   this.contactsform = this.frmbuilder.group({
      //     contactarray: this.frmbuilder.array([this.createcontact()])
      //   });
      }

    })

}




// onchange event

changeAllByCityMailBusiness() {
  let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_Past")).value;

          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {

              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

              this.VendorMgmtBusiness.controls.BMZipcode1.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {

                // console.log(statelist);
                this.statedetailPastAddr=statelist;

                this.VendorMgmtBusiness.controls.BMStateId1.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {


                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtBusiness.controls.BMDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;

                    this.VendorMgmtBusiness.controls.BMStateId1.setValue(this.statedetailPastAddr.Statelist[0].StateId);


                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;

                        this.VendorMgmtBusiness.controls.BMCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })


}


changeAllDetailsByCityPastBusiness(){
  // alert("in");
  let cityid = (<HTMLInputElement>document.getElementById("currentcity_idPastBusiness")).value;

          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {

              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

              this.VendorMgmtBusiness.controls.BPZipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {

                // console.log(statelist);
                this.statedetailPastAddr=statelist;

                this.VendorMgmtBusiness.controls.BPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {


                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtBusiness.controls.BPDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;

                    this.VendorMgmtBusiness.controls.BPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);


                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;

                        this.VendorMgmtBusiness.controls.BPCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })
}



// // current address
// changeAllDetailsByCityCurrentBusiness(){
//   // alert("in");
//   let cityid = (<HTMLInputElement>document.getElementById("currentcity_idbus")).value;

//           this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
//             {

//               this.zipcodeValPastAddr=data1;
//               console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

//               this.VendorMgmtBusiness.controls.Zipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

//              })

//              this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
//               {

//                 // console.log(statelist);
//                 this.statedetailPastAddr=statelist;

//                 this.VendorMgmtBusiness.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
//                })

//                this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
//                 {


//                   this.statedetailPastAddr=statelist;
//                   // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
//                   this.VendorMgmtBusiness.controls.DistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
//                  })

//                  this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
//                   {

//                     // console.log(statelist);
//                     this.statedetailPastAddr=statelist;

//                     this.VendorMgmtBusiness.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);


//                     this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
//                       {
//                         // alert(this.globalStateid);
//              this.countrytypePastAddr = countrydata;

//                         this.VendorMgmtBusiness.controls.CountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
//                       })
//                    })
// }



// individual current address

changeAllDetailsByCityCurrentIndividual(){

  let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_ind")).value;
  // alert(cityid);
          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {

              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

              this.VendorMgmtIndividual.controls.Zipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {

                // console.log(statelist);
                this.statedetailPastAddr=statelist;

                this.VendorMgmtIndividual.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {


                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtIndividual.controls.DistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;

                    this.VendorMgmtIndividual.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);


                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;

                        this.VendorMgmtIndividual.controls.CountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })
}

//
changeAllDetailsByCityMailIndividual(){
//  alert("in");
  let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_mailInd")).value;
  // alert(cityid);
          this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
            {

              this.zipcodeValPastAddr=data1;
              console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

              this.VendorMgmtIndividual.controls.IMZipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

             })

             this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
              {

                // console.log(statelist);
                this.statedetailPastAddr=statelist;

                this.VendorMgmtIndividual.controls.IMStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {


                  this.statedetailPastAddr=statelist;
                  // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                  this.VendorMgmtIndividual.controls.IMDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;

                    this.VendorMgmtIndividual.controls.IMStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);


                    this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                      {
                        // alert(this.globalStateid);
             this.countrytypePastAddr = countrydata;

                        this.VendorMgmtIndividual.controls.IMCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                      })
                   })
}


changeAllDetailsByCityPastIndividual(){
  //  alert("in");
    let cityid = (<HTMLInputElement>document.getElementById("currentcity_id_mailInd")).value;
    // alert(cityid);
            this.http.get(config_url+'/app/getZipcodeByCity?cityid='+cityid).subscribe(data1 =>
              {

                this.zipcodeValPastAddr=data1;
                console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

                this.VendorMgmtIndividual.controls.IPZipcode.setValue(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

               })

               this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                {

                  // console.log(statelist);
                  this.statedetailPastAddr=statelist;

                  this.VendorMgmtIndividual.controls.IPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                 })

                 this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                  {


                    this.statedetailPastAddr=statelist;
                    // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                    this.VendorMgmtIndividual.controls.IPDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);
                   })

                   this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+cityid).subscribe(statelist =>
                    {

                      // console.log(statelist);
                      this.statedetailPastAddr=statelist;

                      this.VendorMgmtIndividual.controls.IPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);


                      this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                        {
                          // alert(this.globalStateid);
               this.countrytypePastAddr = countrydata;

                          this.VendorMgmtIndividual.controls.IPCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                        })
                     })
  }



// zipcode start

  changeAllDeatilsByZipcodeIndCurAddr(){
    let currentzipcode_idInd = (<HTMLInputElement>document.getElementById("currentzipcode_idInd")).value;
    // alert(cityid);
            this.http.get(config_url+'/app/getCityByZipcode?zipcode='+currentzipcode_idInd).subscribe(data1 =>
              {

                this.cityvalbyzipcode=data1;
                // console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

                this.VendorMgmtIndividual.controls.CityId.setValue(this.cityvalbyzipcode.citydata[0].CityId);



                this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;

                    this.VendorMgmtIndividual.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                   })

                   this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                    {


                      this.statedetailPastAddr=statelist;
                      // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                      this.VendorMgmtIndividual.controls.DistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);

                      this.VendorMgmtIndividual.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);




                        this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                          {
                            // alert(this.globalStateid);
                 this.countrytypePastAddr = countrydata;

                            this.VendorMgmtIndividual.controls.CountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                          })

                        })


               })

  }


  changeAllDeatilsByZipcodeIndMailAddr(){
    let currentzipcode_idInd = (<HTMLInputElement>document.getElementById("currentzipcode_id_indmail")).value;
    // alert(cityid);
            this.http.get(config_url+'/app/getCityByZipcode?zipcode='+currentzipcode_idInd).subscribe(data1 =>
              {

                this.cityvalbyzipcode=data1;
                // console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

                this.VendorMgmtIndividual.controls.IMCityId.setValue(this.cityvalbyzipcode.citydata[0].CityId);



                this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;

                    this.VendorMgmtIndividual.controls.IMStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                   })

                   this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                    {


                      this.statedetailPastAddr=statelist;
                      // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                      this.VendorMgmtIndividual.controls.IMDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);

                      this.VendorMgmtIndividual.controls.IMStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);




                        this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                          {
                            // alert(this.globalStateid);
                 this.countrytypePastAddr = countrydata;

                            this.VendorMgmtIndividual.controls.IMCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                          })

                        })


               })

  }


  changeAllDeatilsByZipcodeIndPastAddr(){
    let currentzipcode_idInd = (<HTMLInputElement>document.getElementById("currentzipcode_id_indpast")).value;
    // alert(cityid);
            this.http.get(config_url+'/app/getCityByZipcode?zipcode='+currentzipcode_idInd).subscribe(data1 =>
              {

                this.cityvalbyzipcode=data1;
                // console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

                this.VendorMgmtIndividual.controls.IPCityId.setValue(this.cityvalbyzipcode.citydata[0].CityId);



                this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;

                    this.VendorMgmtIndividual.controls.IPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                   })

                   this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                    {


                      this.statedetailPastAddr=statelist;
                      // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                      this.VendorMgmtIndividual.controls.IPDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);

                      this.VendorMgmtIndividual.controls.IPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);




                        this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                          {
                            // alert(this.globalStateid);
                 this.countrytypePastAddr = countrydata;

                            this.VendorMgmtIndividual.controls.IPCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                          })

                        })


               })

  }


  changeAllDeatilsByZipcodeBusCurrentAddr(){
    // alert("in");
    let currentzipcode_idInd = (<HTMLInputElement>document.getElementById("currentzipcode_id_mailbus")).value;
    // alert(cityid);
            this.http.get(config_url+'/app/getCityByZipcode?zipcode='+currentzipcode_idInd).subscribe(data1 =>
              {

                this.cityvalbyzipcode=data1;
                // console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

                this.VendorMgmtBusiness.controls.CityId.setValue(this.cityvalbyzipcode.citydata[0].CityId);



                this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                  {

                    // console.log(statelist);
                    this.statedetailPastAddr=statelist;

                    this.VendorMgmtBusiness.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                   })

                   this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                    {


                      this.statedetailPastAddr=statelist;
                      // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                      this.VendorMgmtBusiness.controls.DistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);

                      this.VendorMgmtBusiness.controls.StateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);




                        this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                          {
                            // alert(this.globalStateid);
                 this.countrytypePastAddr = countrydata;

                            this.VendorMgmtBusiness.controls.CountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                          })

                        })


               })

  }



  changeAllDeatilsByZipcodeBusMailAddr(){
    // alert("in");
    let currentzipcode = (<HTMLInputElement>document.getElementById("zipcode_id_bus_mail")).value;
    // alert(currentzipcode);
            this.http.get(config_url+'/app/getCityByZipcode?zipcode='+currentzipcode).subscribe(data1 =>
              {

                this.cityvalbyzipcode=data1;
                // console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

                this.VendorMgmtBusiness.controls.BMCityId.setValue(this.cityvalbyzipcode.citydata[0].CityId);



                // this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                //   {

                    // console.log(statelist);
                    // this.statedetailPastAddr=statelist;

                    // this.VendorMgmtBusiness.controls.BMStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                  //  })

                   this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                    {


                      this.statedetailPastAddr=statelist;
                      // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                      this.VendorMgmtBusiness.controls.BMDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);

                      this.VendorMgmtBusiness.controls.BMStateId1.setValue(this.statedetailPastAddr.Statelist[0].StateId);




                        this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                          {
                            // alert(this.globalStateid);
                 this.countrytypePastAddr = countrydata;

                            this.VendorMgmtBusiness.controls.BMCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                          })

                        })


               })

  }


  changeAllDeatilsByZipcodeBusPastAddr(){
    // alert("in");
    let currentzipcode = (<HTMLInputElement>document.getElementById("currentzipcode_id_past")).value;
    // alert(currentzipcode);
            this.http.get(config_url+'/app/getCityByZipcode?zipcode='+currentzipcode).subscribe(data1 =>
              {

                this.cityvalbyzipcode=data1;
                // console.log(this.zipcodeValPastAddr.zipcodedata[0].Zipcode);

                this.VendorMgmtBusiness.controls.BPCityId.setValue(this.cityvalbyzipcode.citydata[0].CityId);



                // this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                //   {

                    // console.log(statelist);
                    // this.statedetailPastAddr=statelist;

                    // this.VendorMgmtBusiness.controls.BMStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);
                  //  })

                   this.http.get(config_url+'/app/getdistrictstatebycity?cityid='+this.cityvalbyzipcode.citydata[0].CityId).subscribe(statelist =>
                    {


                      this.statedetailPastAddr=statelist;
                      // this.indBusPastAddressStateFinal=this.statedetailPastAddr.Statelist;
                      this.VendorMgmtBusiness.controls.BPDistrictId.setValue(this.statedetailPastAddr.Statelist[0].DistrictId);

                      this.VendorMgmtBusiness.controls.BPStateId.setValue(this.statedetailPastAddr.Statelist[0].StateId);




                        this.http.get(config_url+'/app/getCountryByState?stateid='+this.statedetailPastAddr.Statelist[0].StateId).subscribe(countrydata =>
                          {
                            // alert(this.globalStateid);
                 this.countrytypePastAddr = countrydata;

                            this.VendorMgmtBusiness.controls.BPCountryId.setValue(this.countrytypePastAddr.countrydata[0].CountryId);
                          })

                        })


               })

  }

}

import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css'],
  providers: [Commonservices]
})
export class MyorderComponent implements OnInit {
  public loadinglist:boolean;
  public p: number = 1;
  public serverurl;
  public userid;
  public isadmin;
  public orderlist;
  public searchDate;
  public searchText;

  constructor(private _commonservices: Commonservices, userdata: CookieService, private router: Router,private _http: Http) {
    this.serverurl=_commonservices.url;
    this.userid = '';

    let userdata2: any;
    userdata2= userdata.get('userdetails');

    if (typeof (userdata2) == 'undefined' || userdata2 == ''){
      this.router.navigateByUrl('/login');
    }else{
      userdata2 =JSON.parse(userdata2);
      this.userid = userdata2._id;
      this.getMyOrders();
    }
  }

  ngOnInit() {
  }

  getMyOrders(){
    this.loadinglist = true;
    var link =this.serverurl+'myorder';
    var data = {_id:this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          this.loadinglist = false;
          var result = res.json();
          this.orderlist = result.item;
        },error => {
          this.loadinglist = false;
          console.log("Oooops!");
        });
  }


  showtwoDecnum(fnum){
    fnum = parseFloat(fnum);
    return fnum.toFixed(2);
  }

}

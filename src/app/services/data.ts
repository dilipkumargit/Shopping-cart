import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'; 


@Injectable()
export class Data{
ifsubmit:boolean=false;
ifcartinfo:boolean=false;
read_data: any;
readdata:  any;
    constructor(
        private http: Http,
       
    ) { }


loadData() {
    this.http.get("/api/listofitems")
        .subscribe((responseData: any) => {
            let response = responseData ? responseData : {};
            this.read_data = response && response._body ? JSON.parse(response._body) : [];
            console.log(this.read_data);
        });
}

loadusercartData(username) {
    this.http.get("/api/usercartinformation/"+ username)
        .subscribe((responseData: any) => {
            let response = responseData ? responseData : {};
            this.readdata = response && response._body ? JSON.parse(response._body) : [];
            console.log(this.readdata);
        });
}
saveData(save: any){
    let body = new URLSearchParams(); 
    let headers = new Headers();
    
    headers.set('Content-Type','application/x-www-form-urlencoded');
    body.append('cartinfo', JSON.stringify(save)); 
    
let options = new RequestOptions({ headers: headers });
this.http.post("/api/saveitemlist", body.toString(), options)
.map(res => res.json()).catch((error: any): any => {
return Observable.throw(error.json().error || 'Server error');
}).subscribe((responseData: any) => {
this.ifsubmit=true;
this.ifcartinfo=true;
var user= JSON.parse(localStorage.getItem("currentUser")).username;
this.loadusercartData(user);
}); 


 

   
    
    
}
}
import { Component, OnInit, Input } from '@angular/core';
import { Data } from '../services/index';
import { Router } from "@angular/router";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  @Input() orderDetail: any;
  loadusercartData: any;
  saveData: any;
  cartinfo: any;
  isDataDisplayed: boolean;
  showCartInfo : boolean  = false;
  quantitynumber: any;
  OrderDetailAmount: any;
  deliveryaddress: any;
  price: any;
  constructor(private data: Data,
  private router: Router) { }
 
  ngOnInit() {
    
  }

  submit(cartinfo,deliveryaddress)
  {
    this.data.ifsubmit=false;
    this.showCartInfo=true;
    var user= JSON.parse(localStorage.getItem("currentUser")).username;
    let objJSON = {
      USERNAME: '',
      ITEMNAMES: [],
      DELIVERYADDRESS: '',
      AMOUNT: 0,
      ITEMCOUNTS: []
    };
    let itemnames = [],
        overallitemcounts = [],
        amount=0;
    for (var i = 0 ; i < cartinfo.length; i ++) {
      itemnames.push(cartinfo[i].NAME);
      overallitemcounts.push(cartinfo[i].quantity);
      amount += cartinfo[i].Amount
    }
    objJSON = {
      USERNAME : user,
      ITEMNAMES: itemnames,
      DELIVERYADDRESS : deliveryaddress,
      AMOUNT : amount,
      ITEMCOUNTS : overallitemcounts
    };
    this.data.saveData(objJSON);
    
  } 

  calculateamount(orderDetail,quantitynumber)
  {
     orderDetail.Amount = (orderDetail.PRICE* quantitynumber);
    console.log(orderDetail.PRICE * quantitynumber);
  }
  showinfo()
  {
    this.showCartInfo=true;
  }
  
  navigate() {
    this.router.navigate(["HomePageComponent"]);
  }
}

import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../services/index';
import { GroupByPipe } from '../pipe/group_by.pipe';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Input() loadData: any;
  selectedData: any;
  showCartInfo : boolean  = false;
  isDataDisplayed: boolean;

  constructor(
    public data: Data,
    public router: Router
  ) { }

  ngOnInit() {
    this.data.loadData();
    this.isDataDisplayed = false;
    this.selectedData = [];
  }

  logout() {

    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);
  }

  showDataDetails() {
    this.isDataDisplayed = true;
  }

  addItemToCart(currentData : any) {
    this.selectedData.push(currentData);
    currentData.hideAddToCart = true;
  }

  showHomePageInfo() {
    this.showCartInfo = false;
    this.data.ifcartinfo = false;
  }

  getData(currentData: any) {
    this.addItemToCart(currentData);
    this.showCartInfo = true;
  }

  showOrderInfo() {
    this.showCartInfo = true;
  }
  displayCartDetails()
  {
    this.data.ifcartinfo=true;
    var user= JSON.parse(localStorage.getItem("currentUser")).username;
    this.data.loadusercartData(user);
  }
  
}

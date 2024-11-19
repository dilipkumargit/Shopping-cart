import { Component, OnInit } from '@angular/core';
import { Data } from '../services/index';
import { AccordionModule } from "ng2-accordion";

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit {
   isvisible:boolean=false;
  constructor(   public data: Data) { }

  ngOnInit() {
  }

  accordionDisplay()
  {
    this.isvisible=true;
  }

}

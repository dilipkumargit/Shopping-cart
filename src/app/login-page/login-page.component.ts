import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  returnPage: string;
  objlogin: any = {
    username: '', password: ''
  };
  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    this.returnPage = '/';

  }

  login(username: string, password: string) {

    if (username == 'test' && password == 'test') {
      let currentUser = {
        'username' : username,
        'password' : password
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      this.router.navigate([this.returnPage]);
    }


  }

  
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule} from '@angular/forms';
import { Data } from './services/index';
import { AppComponent } from './app.component';
import { AccordionModule } from "ng2-accordion";
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './guards';
import { HttpModule } from '@angular/http';
import { GroupByPipe } from './pipe/group_by.pipe';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartInfoComponent } from './cart-info/cart-info.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupByPipe,
    HomePageComponent,
    LoginPageComponent,
    ProductPageComponent,
    CartInfoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AccordionModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    Data,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

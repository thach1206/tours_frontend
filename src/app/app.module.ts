import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from '../auth.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TourDetailComponent } from './components/tour-detail/tour-detail.component';
import { ListTourComponent } from './components/list-tour/list-tour.component';
import { SearchComponent } from './components/search/search.component';
import { PostComponent } from './components/post/post.component';
import { QuanLyComponent } from './ADMIN/quan-ly/quan-ly.component';
import { NavQuanLyComponent } from './ADMIN/nav-quan-ly/nav-quan-ly.component';
import { QuanLyTourComponent } from './ADMIN/quan-ly-tour/quan-ly-tour.component';
import { QuanLyPostComponent } from './ADMIN/quan-ly-post/quan-ly-post.component';
import { QuanLyKhuyenMaiComponent } from './ADMIN/quan-ly-khuyen-mai/quan-ly-khuyen-mai.component';
import { QuanLyDoanhThuComponent } from './ADMIN/quan-ly-doanh-thu/quan-ly-doanh-thu.component';
import { QuillModule } from 'ngx-quill';
import { BookingPageComponent } from './components/booking-page/booking-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EvaluateComponent } from './components/evaluate/evaluate.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    TourDetailComponent,
    ListTourComponent,
    SearchComponent,
    PostComponent,
    QuanLyComponent,
    NavQuanLyComponent,
    QuanLyTourComponent,
    QuanLyPostComponent,
    QuanLyKhuyenMaiComponent,
    QuanLyDoanhThuComponent,
    BookingPageComponent,
    CartComponent,
    ForgotPasswordComponent,
    EvaluateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

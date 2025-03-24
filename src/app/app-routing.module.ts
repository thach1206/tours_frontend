import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { TourDetailComponent } from './components/tour-detail/tour-detail.component';
import { ListTourComponent } from './components/list-tour/list-tour.component';
import { PostComponent } from './components/post/post.component';
import { QuanLyComponent } from './ADMIN/quan-ly/quan-ly.component';
import { BookingPageComponent } from './components/booking-page/booking-page.component';
import { AuthGuard } from '../AuthGuard';
import { Authorizer } from '../Authorizer';
import { CartComponent } from './components/cart/cart.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path : 'dang-nhap',
    component : LoginComponent
  },
  {
    path : 'quen-mat-khau',
    component : ForgotPasswordComponent
  },
  {
    path : 'dang-ky',
    component : RegisterComponent
  },
  {
    path : 'home-page',
    component : HomeComponent
  },
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'post-page',
    component : PostComponent
  },
  {
    path : 'quan-ly',
    component : QuanLyComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'cart',
    component : CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'contact-page',
    component : ContactComponent
  },
  {
    path : 'detail-page/:id',
    component : TourDetailComponent
  },
  {
    path : 'booking-page/:id',
    component : BookingPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search/:description',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

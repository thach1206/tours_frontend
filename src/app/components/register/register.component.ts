import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    email: null,
    phone: null,
    role: 'USER',
    address: null,
    username: null,
    password: null,
    gender: null,
    dob: null,
    statusAction: 'ACTIVE'
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Implement logic if needed on initialization
  }

  onSubmit() {
    console.log(this.form);
    this.authService.register(
      this.form.name,
      this.form.email,
      this.form.phone,
      this.form.role,
      this.form.address,
      this.form.username,
      this.form.password,
      this.form.gender,
      this.form.dob,
      this.form.statusAction
    );
  }
}

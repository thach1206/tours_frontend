import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  form: any = {
    email: null,
  };

  resetCode: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.forgotPassword(this.form.email).subscribe({
      next: (response) => {
        alert('Email khôi phục đã được gửi!');
        this.openModal(); // Hiển thị modal nhập mã
        localStorage.removeItem("email");
        localStorage.setItem("email", this.form.email)
      },
      error: (err) => {
        console.log(err);
        alert('Không tìm thấy email!')
      }
    });
  }


  openModal() {
    const modalElement = document.getElementById('resetPasswordModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Sử dụng Bootstrap Modal
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('resetPasswordModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Sử dụng Bootstrap Modal
      modal.hide();
    }
  }

  onSubmitCode() {
    const email = localStorage.getItem('email') ?? ''; 
    console.log(email);
    this.authService.resetPassword(this.resetCode, this.newPassword, email).subscribe((response) => {
      if (response.message !== 'Mật khẩu đã được cập nhật thành công!') {
        this.closeModal();
        alert(response.message);
      }
      else {
        alert(response.message)
      }
      this.router.navigate(['/dang-nhap']);
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../../common/user';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../common/booking';
import { EvaluateService } from '../../services/evaluate.service';

declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private bookingService: BookingService, private evaluateService: EvaluateService) { }

  user: any;
  bookings: Booking[] = [];
  currentDate: Date = new Date();
  total: number = 0;
  rating = {
    numberStar: null,
    title: '',
    content: '',
    accountId: null,
    bookingId: -1
  };

  currentBookingId?: number;

  setCurrentBooking(bookingId: number, title: string) {
    this.currentBookingId = bookingId;
    this.rating.accountId = this.user.idAccount;;
    this.rating.title = title;
    this.rating.bookingId = this.currentBookingId;
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('auth-user') || '';

    this.user = JSON.parse(userString);

    this.getAllBookingByUsername()
  }

  getAllBookingByUsername() {
    this.bookingService.getAllbookingByUsername(this.user.username).subscribe(
      (response) => {
        this.bookings = response.result;
        this.bookings.forEach(booking => {
          this.total += parseInt(booking.total, 10);
          const localReturnDate = new Date(booking.tour.returnDate);

          // Lấy chênh lệch múi giờ của địa phương (phút)
          const timezoneOffset = localReturnDate.getTimezoneOffset();

          // Chuyển đổi lại về thời gian UTC bằng cách trừ đi độ lệch múi giờ
          const utcReturnDate = new Date(localReturnDate.getTime() + timezoneOffset * 60000);

          console.log("Original returnDate (Local Time): ", localReturnDate);
          console.log("UTC returnDate: ", utcReturnDate);

          // Cập nhật lại booking với returnDate đúng giờ UTC
          booking.tour.returnDate = utcReturnDate;
        });
      }
    )
  }

  cancelTour() {
    this.bookingService.cancelTour(this.rating.bookingId).subscribe(
      (res) => {
        this.getAllBookingByUsername();
        const modalElement = document.getElementById('cancelTourModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    )
  }

  // Hàm submit đánh giá
  submitRating() {
    if (!this.rating.numberStar || this.rating.numberStar < 1 || this.rating.numberStar > 5) {
      alert('Vui lòng nhập số sao từ 1 đến 5.');
      return;
    }

    // dữ liệu gửi đi tới server
    const reviewData = {
      numberStar: this.rating.numberStar,
      title: this.rating.title,
      content: this.rating.content,
      bookingId: this.rating.bookingId,
      accountId: this.rating.accountId
    };

    this.evaluateService.submitReview(reviewData).subscribe(
      (response) => {
        console.log('Đánh giá thành công:', response);
        alert('Đánh giá của bạn đã được gửi.');

        const modalElement = document.getElementById('ratingModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.getAllBookingByUsername();
      },
      (error) => {
        console.error('Lỗi khi gửi đánh giá:', error);
        alert('Gửi đánh giá thất bại.');
      }
    );

    // Reset form sau khi gửi
    this.rating = {
      numberStar: null,
      title: '',
      content: '',
      accountId: null,
      bookingId: -1
    };
  }
}


import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../common/booking';

@Component({
  selector: 'app-quan-ly-doanh-thu',
  templateUrl: './quan-ly-doanh-thu.component.html',
  styleUrl: './quan-ly-doanh-thu.component.css'
})
export class QuanLyDoanhThuComponent implements OnInit {

  reportType: string = 'all';
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getAllBooking();
  }

  getAllBooking() {
    this.bookingService.getAllbooking().subscribe((response) => {
      this.bookings = response.result;

      this.bookings.forEach(booking => {
        const localReturnDate = new Date(booking.tour.returnDate);
        const timezoneOffset = localReturnDate.getTimezoneOffset();
        const utcReturnDate = new Date(localReturnDate.getTime() + timezoneOffset * 60000);

        booking.tour.returnDate = utcReturnDate;
      });
      this.filterBookings();
    });
  }

  selectReportType(type: string) {
    this.reportType = type;
  }

  filterBookings() {
    // Kiểm tra dữ liệu có sẵn không
    if (!this.bookings || this.bookings.length === 0) {
      alert('Không có dữ liệu để lọc!');
      return;
    }

    // Xử lý điều kiện cho từng loại báo cáo
    if (this.reportType === 'day') {
      if (!this.startDate || !this.endDate) {
        alert('Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc!');
        return;
      }
      if (this.startDate > this.endDate) {
        alert('Ngày bắt đầu phải sớm hơn ngày kết thúc!');
        return;
      }
    } else if (this.reportType === 'month') {
      if (!this.startDate) {
        alert('Vui lòng chọn tháng!');
        return;
      }
    } else if (this.reportType === 'year') {
      if (!this.startDate) {
        alert('Vui lòng chọn năm!');
        return;
      }
    }

    // Lọc booking theo loại báo cáo
    if (this.reportType === 'all') {
      this.filteredBookings = [...this.bookings];
    } else if (this.reportType === 'day') {
      this.filteredBookings = this.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateAdded);
        return bookingDate >= this.startDate! && bookingDate <= this.endDate!;
      });
    } else if (this.reportType === 'month') {
      this.filteredBookings = this.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateAdded);
        return (
          bookingDate.getFullYear() === this.startDate!.getFullYear() &&
          bookingDate.getMonth() === this.startDate!.getMonth()
        );
      });
    } else if (this.reportType === 'year') {
      this.filteredBookings = this.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateAdded);
        return bookingDate.getFullYear() === this.startDate!.getFullYear();
      });
    }
  }



  calculateTotal(): number {
    return this.filteredBookings.reduce((sum, booking) => sum + parseInt(booking.total, 10), 0);
  }
}

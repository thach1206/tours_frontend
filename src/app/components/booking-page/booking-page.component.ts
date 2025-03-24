import { Component, OnInit } from '@angular/core';
import { Booking } from '../../common/booking';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../common/tour';
import { StorageService } from '../../services/storage.service';
import { User } from '../../common/user';
import { BookingService } from '../../services/booking.service';
import { Promotion } from '../../common/promotion';
import { PromotionService } from '../../services/promotion.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})
export class BookingPageComponent implements OnInit {
  // Danh sách các bước
  steps = ['1. CHỌN DỊCH VỤ', '2. NHẬP THÔNG TIN KHÁCH HÀNG', '3. THANH TOÁN', '4. XÁC NHẬN'];

  // Bước đang active
  activeStep = 0;
  currentStep: number = 1;

  // total
  total = localStorage.getItem('total');
  isSuccessfull: boolean = false;

  promotions: Promotion[] = [];
  selectedPromotion: Promotion | null = null;

  user?: User;

  form: any = {
    adult: 1,
    children: 0,
    baby: 0,
    acceptPolice: false,
    customerName: this.user?.name,
    address: this.user?.address,
    phone: this.user?.phone,
    email: this.user?.email,
    notes: '',
    total: 0,
    promotion: null,
    customerInfoList: [],
  };

  tour?: Tour;
  order: any;
  message: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private promotionService: PromotionService,
    private storateService: StorageService,
    private bookingService: BookingService,
    private emailService: EmailService) {
  }

  ngOnInit(): void {
    // Đọc giá trị từ localStorage khi trang được tải lại
    const savedCurrentStep = localStorage.getItem('currentStep');
    const savedActiveStep = localStorage.getItem('activeStep');
    if (localStorage.getItem('order') != null) {
      this.order = JSON.parse(localStorage.getItem('order') || '{}');
      this.tour = JSON.parse(localStorage.getItem('tour') || '{}');
      this.form = JSON.parse(localStorage.getItem('form') || '{}');
      console.log(this.tour)

      // Kiểm tra kết quả thanh toán từ URL khi người dùng quay lại
      this.route.queryParams.subscribe(params => {
        this.message = params['message'];  // Lấy giá trị của 'message'
        console.log(this.message);

        if (this.message === 'Successful.') {
          // Nếu thanh toán thành công, tiến hành tạo booking
          this.user = this.storateService.getUser();
          this.createBooking();

          this.currentStep = 4;        // Chuyển sang bước thanh toán thành công
          this.activeStep = 3;         // Đánh dấu bước thanh toán đã hoàn tất

          // Lưu lại giá trị vào localStorage
          localStorage.setItem('currentStep', this.currentStep.toString());
          localStorage.setItem('activeStep', this.activeStep.toString());

          this.isSuccessfull = true;

        } else {
          this.currentStep = 4;
          this.activeStep = 3;
          this.getAllPromotion();
        }
      });
    }
    else {
      // Chuyển đổi giá trị lấy từ localStorage thành số
      if (savedCurrentStep) {
        this.currentStep = parseInt(savedCurrentStep, 10);  // Hoặc dùng Number(savedCurrentStep)
      }

      if (savedActiveStep) {
        this.activeStep = parseInt(savedActiveStep, 10);  // Hoặc dùng Number(savedActiveStep)
      }


      window.scrollTo(0, 0)
      const tourId: string = this.route.snapshot.paramMap.get('id')!;
      const currentTime = Date.now();

      this.getTourById(tourId);
      this.user = this.storateService.getUser();

      this.getAllPromotion();

      if (this.user) {
        this.form.customerName = this.user.name;
        this.form.address = this.user.address;
        this.form.phone = this.user.phone;
        this.form.email = this.user.email;
      }

      this.order = {
        orderId: "",
        requestId: "",
        amount: "0",
        orderInfo: "",
        returnURL: `http://localhost:4200/booking-page/${tourId}`,
        notifyURL: `http://localhost:4200/booking-page/${tourId}`,
        extraData: "",
      }
    }
  }

  // Chọn một voucher
  selectPromotion(promotion: Promotion) {
    this.selectedPromotion = promotion;
    this.form.promotion = promotion;
    console.log("Voucher đã chọn:", promotion);
  }

  getAllPromotion() {
    this.promotionService.getAll().subscribe(
      (response) => {
        console.log(response)
        this.promotions = response.result;
      }
    )
  }

  getTourById(tourId: string) {
    this.tourService.getTourById(tourId).subscribe(
      (data: any) => {
        console.log(data);

        this.tour = data.result;
        console.log("first call: ", this.tour)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  isStep1Valid(): boolean {
    return this.form.adult >= 1 && this.form.acceptPolice;
  }

  // Kiểm tra tính hợp lệ của step 2
  isStep2Valid(): boolean {
    return (
      this.form.customerName.trim() !== '' &&
      this.form.address.trim() !== '' &&
      this.form.phone.trim() !== '' &&
      this.form.email.trim() !== ''
    );
  }

  // Hàm để thay đổi bước active
  setActiveStep() {
    this.activeStep = this.currentStep - 1;
  }

  // Điều hướng tới bước tiếp theo
  nextStep(): void {
    if (this.currentStep === 1 && !this.isStep1Valid()) {
      alert('Vui lòng nhập đầy đủ thông tin ở bước 1.');
      return;
    }
    if (this.currentStep === 2 && !this.isStep2Valid()) {
      alert('Vui lòng nhập đầy đủ thông tin ở bước 2.');
      return;
    }
    this.currentStep++;
    this.setActiveStep();
  }

  // Quay lại bước trước đó
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.setActiveStep();
    }
  }

  // Submit thông tin booking
  submitBooking(): void {
    if (this.currentStep === 3) {
      const currentTime = Date.now();
      this.order.orderId = "orderId-" + currentTime;
      this.order.requestId = "requestId-" + currentTime;

      let cost = 0;

      if (this.user?.payed) {
        cost = parseInt(this.user?.payed);
      }

      let coupon = ((this.tour?.price || 0) * this.form.adult +
        (this.tour?.childPrice || 0) * this.form.children +
        (this.tour?.babyPrice || 0) * this.form.baby) * (this.selectedPromotion?.discountPercentage || 0) / 100;

      if (cost <= 10000000) {
        cost = ((this.tour?.price || 0) * this.form.adult +
          (this.tour?.childPrice || 0) * this.form.children +
          (this.tour?.babyPrice || 0) * this.form.baby) * 0.05;
      } else if (cost <= 20000000) {
        cost = ((this.tour?.price || 0) * this.form.adult +
          (this.tour?.childPrice || 0) * this.form.children +
          (this.tour?.babyPrice || 0) * this.form.baby) * 0.07;
      } else if (cost > 50000000) {
        cost = ((this.tour?.price || 0) * this.form.adult +
          (this.tour?.childPrice || 0) * this.form.children +
          (this.tour?.babyPrice || 0) * this.form.baby) * 0.1;
      } else {
        cost = 0;
      }

      // Đảm bảo maxDiscountAmount có giá trị hợp lệ (0 nếu undefined)
      const maxDiscountAmount = this.selectedPromotion?.maxDiscountAmount ?? 0;

      // Kiểm tra và gán giá trị cho coupon
      if (coupon > maxDiscountAmount) {
        coupon = maxDiscountAmount;
      }

      this.form.total = Math.floor(((this.tour?.price || 0) * this.form.adult +
        (this.tour?.childPrice || 0) * this.form.children +
        (this.tour?.babyPrice || 0) * this.form.baby) - coupon - cost);

      this.order.amount = this.form.total.toString();
      this.order.orderInfo = "Thông tin đơn hàng: " + this.tour?.titleTour;

      localStorage.setItem('total', this.form.total.toString());

      this.bookingService.submitOrder(this.order).subscribe({
        next: (response) => {
          localStorage.removeItem('order');
          localStorage.removeItem('tour');
          localStorage.removeItem('form');
          localStorage.setItem('order', JSON.stringify(this.order));
          if (this.tour) {
            this.tour.image = '';
            this.tour.description = '';
          }

          localStorage.setItem('tour', JSON.stringify(this.tour));
          localStorage.setItem('form', JSON.stringify(this.form));
          console.log("submitOrder called");
          console.log(response);

          // chuyen huong toi payurl
          const payUrl = response.result.payUrl;
          window.location.href = payUrl;

        },
        error: (err) => {
          console.error('Lỗi khi tạo đơn hàng:', err);
        }
      });
    }
  }

  createBooking() {
    console.log("create booking call")
    console.log(this.form)
    this.bookingService.createBooking(this.user?.idAccount, this.tour?.idTour, this.form).subscribe({
      next: (response) => {
        console.log("createBoking res: ")
        console.log(response.result);
        const userEmail = this.user?.email ?? 'email_not_available@example.com';


        this.emailService.sendEmail(
          userEmail,
          this.order.orderId,
          `Lữ hành KimtuyenTravel đã nhận YÊU CẦU MUA của quý khách - MÃ ĐƠN HÀNG: ${this.order.orderId}
          Nhân viên KimtuyenTravel sẽ liên hệ lại quý khách để xác nhận lại số chỗ trong vòng 01 ngày làm việc.

          Thông tin khách hàng:
          Họ tên : ${this.user?.name}
          Địa chỉ : ${this.user?.address}
          Số điện thoại : ${this.user?.phone}
          Email : ${this.user?.email}

          Thông tin dịch vụ:
          Tên dịch vụ : Du Lịch Thái Lan - Tết Nguyên Đán 2025 [Bangkok - Pattaya] (Vườn Nong Nooch - Chợ Nổi - Lâu Đài Tỷ Phú - Buffet Du Thuyền Trên Sông Chaopraya) (Mùng 3)
          Mã Tour : ${this.order.orderId}
          Điểm đi : TP. Hồ Chí Minh
          Điểm tham quan : ${this.tour?.address}
          Thời gian đi : ${this.tour?.departureDate}
          Thời gian về : ${this.tour?.returnDate}
          Tổng hành trình : ${this.tour?.duration}`
        ).subscribe({
          next(res) {
            console.log(console.log(res))
          },
          error(err) {
            console.log(console.log(err))
          },
        }
        )
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  // Hàm tính và cập nhật danh sách customerInfo
  updateCustomerInfoList() {
    const totalGuests = this.form.adult + this.form.children + this.form.baby - 1;
    const currentLength = this.form.customerInfoList.length;

    // Thêm khách nếu danh sách hiện tại ngắn hơn số khách cần
    if (totalGuests > currentLength) {
      for (let i = currentLength; i < totalGuests; i++) {
        this.form.customerInfoList.push({
          id: i + 1, // Tạo ID duy nhất
          customerName: '',
          phone: '',
          address: '',
          gender: '',
        });
      }
    }

    // Xóa bớt khách nếu danh sách hiện tại dài hơn số khách cần
    if (totalGuests < currentLength) {
      this.form.customerInfoList.splice(totalGuests);
    }
  }

  // Theo dõi sự thay đổi của adult, children, baby
  onGuestCountChange() {
    this.updateCustomerInfoList();
  }

  resetStep() {
    localStorage.removeItem('order');
    localStorage.removeItem('tour');
    localStorage.removeItem('form');
    localStorage.removeItem('currentStep');
    localStorage.removeItem('activeStep');
    localStorage.removeItem('total')
    // Lưu lại giá trị vào localStorage
    localStorage.setItem('currentStep', '1');
    localStorage.setItem('activeStep', '0');
  }
}

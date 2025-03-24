import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../common/tour';
declare var bootstrap: any;

@Component({
  selector: 'app-quan-ly-tour',
  templateUrl: './quan-ly-tour.component.html',
  styleUrl: './quan-ly-tour.component.css'
})
export class QuanLyTourComponent implements OnInit {
  tourList: Tour[] = [];
  currentId: number = -1;

  tours: any;
  constructor(private tourService: TourService) { }

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'align': [] }]
    ]
  };

  form: any = {
    idTour: null,
    titleTour: null,
    price: null,
    childPrice: null,
    babyPrice: null,
    // sale: 0,
    departureDate: null,
    returnDate: null,
    description: null,
    address: null,
    status: null,
    duration: null,
    type: null,
    views: 0,
    votes: 0,
    purchaseCount: 0,
    statusAction: null,
    image: null,
  }

  ngOnInit(): void {
    this.getAllTour();
  }

  getAllTour() {
    this.tourService.getAllTour().subscribe(
      (data: any) => {
        this.tourList = data.result;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // Đặt ID của tour cần xóa
  setTourId(id: number) {
    this.currentId = id;
  }

  // Hàm lấy chi tiết tour để chỉnh sửa
  editTour(idTour: number) {
    this.tourService.getTourById(idTour.toString()).subscribe(
      (data: any) => {
        this.form = data.result;
        const departureDate = new Date(data.result.departureDate);
        this.form.departureDate = departureDate.toISOString().slice(0, 16);

        const returnDate = new Date(data.result.returnDate);
        this.form.returnDate = returnDate.toISOString().slice(0, 16);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Hàm xóa tour
  deleteTour() {
    this.tourService.deleteTour(this.currentId).subscribe(
      (data: any) => {
        console.log(data.result);
        const modalElement = document.getElementById('deleteTourModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        // Cập nhật danh sách tour sau khi xóa
        this.getAllTour();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Hàm lưu các thay đổi trong form chỉnh sửa tour
  saveChanges() {
    this.tourService.updateTour(this.form).subscribe(
      (res) => {
      const modalElement = document.getElementById('editTourModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      // Cập nhật danh sách tour sau khi chỉnh sửa
      this.getAllTour();
    })
    
  
  }

  // Hàm xử lý khi người dùng chọn ảnh
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  createTour() {
    this.tourService.createTour(this.form).subscribe(
      (res) => {
        console.log('Tour creation successfully:', res);
        const modalElement = document.getElementById('createTourModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.getAllTour();
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { EvaluateService } from '../../services/evaluate.service';
import { TourService } from '../../services/tour.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  evaluates: any[] = [];
  tours: any[] = [];
  error: string = '';
  currentPage: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private evaluateService: EvaluateService, private tourService: TourService) { }

  ngOnInit(): void {
    this.evaluateService.getAllEvaluate().subscribe(
      (res) => {
        this.evaluates = res.result;
      }
    );
    this.loadTours();
  }
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadTours();
    }
  }

  searchData: { place: string, dateStart: string, dateEnd: string } | null = null;

  handleSearch(data: { place: string, dateStart: string, dateEnd: string }) {
    this.searchData = data;
  }

  loadTours(): void {
    this.tourService.getSortedToursByRating(this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.tours = data.result.content; // Dữ liệu tours
        this.totalPages = data.result.totalPages; // Tổng số trang
      },
      (error) => {
        console.error('Error fetching tours', error);
        this.error = 'Không thể tải dữ liệu. Vui lòng thử lại sau.';
      }
    );
  }

}

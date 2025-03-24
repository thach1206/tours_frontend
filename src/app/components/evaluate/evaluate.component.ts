import { Component, Input } from '@angular/core';
import { EvaluateService } from '../../services/evaluate.service';
import { TourService } from '../../services/tour.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.css'
})
export class EvaluateComponent {
  evaluates: any[] = [];
  @Input() id!: string;

  tours: any[] = [];
  error: string = '';
  currentPage: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;

  constructor(private evaluateService: EvaluateService, private tourService: TourService) { }

  ngOnInit(): void {

    this.loadTours();
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadTours();
    }
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

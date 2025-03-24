import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../common/tour';
import { TourService } from '../../services/tour.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-tour',
  templateUrl: './list-tour.component.html',
  styleUrl: './list-tour.component.css'
})
export class ListTourComponent implements OnInit {
  @Input() searchData: { place: string, dateStart: string, dateEnd: string } | null = null;

  constructor(private tourService: TourService, private route: ActivatedRoute, private router: Router) { }
  tourList: Tour[] = [];
  searchMode: boolean = false;
  description: string = '';
 

  ngOnInit(): void {
    // de xuat cac type tour du lich - tour bien dao, tour hanh trinh xanh, tour xe tu lai, tour di san, tour thanh loc co the

    // list tour du lich
    this.route.params.subscribe(params => {
      this.description = params['description'];
      this.searchMode = !!this.description;
      this.listTour();
    });
    // de xuat goi uu dai dac biet for

    // de xuat cac diem den duoc yeu thich nhat 8

    // mot vai danh gia tich cuc 3
  }

  ngOnChanges() {
    if (this.searchData) {
      console.log("on search");
      this.tourService.getTourByPlace(this.searchData.place, this.searchData.dateStart, this.searchData.dateEnd).subscribe(
        (data: any) => {
          this.tourList = data.result;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  listTour() {
    if (!this.searchMode) {
      this.getAllTour();
    } else {
      this.handleSearchMode();
    }
  }

  handleSearchMode() {
    console.log("Searching for:", this.description);
    this.tourService.getTourByDescription(this.description).subscribe(
      (data: any) => {
        this.tourList = data.result;
      },
      (error) => {
        console.log(error);
      }
    );
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

}

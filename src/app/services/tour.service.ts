import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tour } from '../common/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  TOUR_PATH: string = 'http://localhost:8080/tour'

  constructor(private http: HttpClient) { }

  getSortedToursByRating(page: number, size: number): Observable<ApiResponse<Page<TourRating>>> {
    return this.http.get<ApiResponse<Page<TourRating>>>(`${this.TOUR_PATH}/sorted-by-rating?page=${page}&size=${size}`);
  }

  getAllTour(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.TOUR_PATH);
  }

  getTourById(idTour: string): Observable<Tour> {
    const url: string = `${this.TOUR_PATH}/${idTour}`;
    return this.http.get<Tour>(url);
  }

  getTourRatingById(idTour: string): Observable<tourRatingResponse> {
    const url: string = `${this.TOUR_PATH}/${idTour}/get-tour-rating`;
    return this.http.get<tourRatingResponse>(url);
  }

  getTourByPlace(place: string, dateStart: string, dateEnd: string): Observable<Tour[]> {
    if (place.replace(/\s+/g, '').length != 0) {
      const url: string = `${this.TOUR_PATH}?place=${place}`;
      return this.http.get<Tour[]>(url)
    }
    else {
      return this.http.get<Tour[]>(this.TOUR_PATH);
    }
  }

  getTourByDescription(description: string): Observable<Tour[]> {
    if (description.replace(/\s+/g, '').length != 0) {
      const url: string = `${this.TOUR_PATH}?description=${description}`;
      return this.http.get<Tour[]>(url)
    }
    else {
      return this.http.get<Tour[]>(this.TOUR_PATH);
    }
  }

  updateTour(form: any): Observable<TourUpdateResponse> {
    const updateTour = {
      titleTour: form.titleTour,
      price: form.price,
      childPrice: form.childPrice,
      babyPrice: form.childPrice,
      sale: form.sale,
      departureDate: form.departureDate,
      returnDate: form.returnDate,
      description: form.description,
      address: form.address,
      duration: form.duration,
      type: form.type,
      views: form.views,
      votes: form.votes,
      purchaseCount: form.purchaseCount,
      statusAction: form.statusAction,
      tagId: form.tagId,
      // serviceId: form.serviceId,  
      // bookings: form.bookings || [],  
      // favorites: form.favorites || [],  
      image: form.image,
    }

    const url: string = `${this.TOUR_PATH}/${form.idTour}`

    return this.http.put<TourUpdateResponse>(url, updateTour)
  }

  deleteTour(currentId: number): Observable<Response> {
    const url: string = `${this.TOUR_PATH}/${currentId}`

    return this.http.delete<Response>(url);
  }

  createTour(form: any) {
    const createTour = {
      titleTour: form.titleTour,
      price: form.price,
      childPrice: form.childPrice,
      babyPrice: form.babyPrice,
      sale: form.sale,
      departureDate: form.departureDate,
      returnDate: form.returnDate,
      description: form.description,
      address: form.address,
      duration: form.duration,
      type: form.type,
      views: form.views,
      votes: form.votes,
      purchaseCount: form.purchaseCount,
      statusAction: "ACTIVE",
      status: "ACTIVE",
      tagId: form.tagId,
      image: form.image,
    }

    const url: string = `${this.TOUR_PATH}`


    return this.http.post<TourUpdateResponse>(url, createTour)
  }
}

interface tourRatingResponse {
  code: string,
  result: {
    idTour: number,
    avgRating: number,
    ratingCount: number
  }
}

interface TourUpdateResponse {
  code: string,
  result: Tour
}

interface Response {
  code: string,
  result: any
}

interface ApiResponse<T> {
  code: string;
  result: T;
}

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

interface TourRating {
  idTour: number;
  image: string;
  titleTour: string;
  avgRating: number;
  ratingCount: number;
}
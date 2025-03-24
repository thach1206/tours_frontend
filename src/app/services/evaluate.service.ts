import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluateService {
  constructor(private http: HttpClient) { }

  EVALUATE_PATH = 'http://localhost:8080/evaluates'

  submitReview(data: any) : Observable<Response>{

    const reviewData = { 
      numberStar: data.numberStar,
      title: data.title,
      content: data.content, 
      bookingId: data.bookingId, 
      accountId: data.accountId 
    }
   return this.http.post<Response>(this.EVALUATE_PATH, reviewData) 
  }

  getAllEvaluate():Observable<Response>{
    return this.http.get<Response>(this.EVALUATE_PATH);
  }

  getAllEvaluateByTourId(tourId: number):Observable<Response>{
    const url = this.EVALUATE_PATH + `/${tourId}`;

    if(tourId == 0){
      return of({} as Response);
    }

    return this.http.get<Response>(url);
  }

}

interface Response{
  code: string,
  result: any
}

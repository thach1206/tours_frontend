import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from '../common/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {


  constructor(private http: HttpClient) { }

  private PROMOTION_PATH = 'http://localhost:8080/promotion';

  getAll(): Observable<GetAllResponse> {
    const url: string = this.PROMOTION_PATH;

    return this.http.get<GetAllResponse>(url);
  }

  getById(idPromotion: number): Observable<Response> {
    const url: string = `${this.PROMOTION_PATH}/${idPromotion}`;

    return this.http.get<Response>(url);
  }

  createNew(form: any): Observable<Response> {
    const url: string = this.PROMOTION_PATH;

    const newPromotion = {
      discountPercentage: form.discountPercentage,
      maxDiscountAmount: form.maxDiscountAmount,
      qualityOnHand: form.qualityOnHand,
      description: form.description,
      startDate: form.startDate,
      endingDate: form.endingDate
    }

    return this.http.post<Response>(url, newPromotion);
  }

  updatePromotion(form: any): Observable<Response> {
    const url: string = `${this.PROMOTION_PATH}/${form.id}`;

    const updatePromotion = {
      discountPercentage: form.discountPercentage,
      maxDiscountAmount: form.maxDiscountAmount,
      qualityOnHand: form.qualityOnHand,
      description: form.description,
      hidden: form.hidden,
      active: form.active,
      statusAction: form.statusAction,
      startDate: form.startDate,
      endingDate: form.endingDate
    }

    return this.http.put<Response>(url, updatePromotion);
  }

  deletePromotion(currentId: number) {
    const url: string = `${this.PROMOTION_PATH}/${currentId}`;

    return this.http.delete<Response>(url);
  }
}

interface GetAllResponse {
  code: string,
  result: Promotion[]
}

interface Response {
  code: string,
  result: Promotion
}



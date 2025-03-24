import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/payments';  // URL của API Backend
  private BOOKING_PATH = 'http://localhost:8080/booking';

  constructor(private http: HttpClient) { }

  submitOrder(order: any): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/create/atm`, order);
  }

  createBooking(idAccount: number | undefined, idTour: number | undefined, form: any): Observable<Response> {
    const url = `${this.BOOKING_PATH}?userId=${idAccount}&tourId=${idTour}`;

    return this.http.post<Response>(url, form);
  }

  cancelTour(bookingId: number):Observable<Response> {
    const url = `${this.BOOKING_PATH}/${bookingId}`;

    return this.http.delete<Response>(url)
  }

  getAllbooking():Observable<Response>{
    const url = this.BOOKING_PATH;

       return this.http.get<Response>(url);
  }

  getAllbookingByUsername(username: any): Observable<Response> {
    const url = this.BOOKING_PATH;

    return this.http.get<Response>(url).pipe(
      map((response: Response) => {

        const filteredResult = response.result.filter((booking: any) => booking.account?.username === username);

        const updatedResult = filteredResult.map((booking: any) => {
          if (booking.tour && booking.tour.returnDate) {
            // Chuyển đổi returnDate thành đối tượng Date
            booking.tour.returnDate = new Date(booking.tour.returnDate);
          }
          return booking;
        });

        // Trả về một response mới với kết quả đã lọc
        return {
          ...response,
          result: filteredResult
        };
      })
    );
  }
}


interface Response {
  code: string,
  result: any
}

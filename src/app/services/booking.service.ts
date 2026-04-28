import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBooking(data: any) {
    return this.http.post<any>(`${this.api}/bookings`, data);
  }

  getMyBookings() {
    return this.http.get<any[]>(`${this.api}/bookings/my`);
  }

  getVendorBookings(status?: string) {
  let params = new HttpParams();
  if (status) params = params.set('status', status);
  return this.http.get<any[]>(`${this.api}/bookings/vendor`, { params });
}

confirmBooking(id: string, quote?: number) {
  return this.http.put<any>(`${this.api}/bookings/${id}/confirm`, { quote });
}

rejectBooking(id: string) {
  return this.http.put<any>(`${this.api}/bookings/${id}/reject`, {});
}

completeBooking(id: string) {
  return this.http.put<any>(`${this.api}/bookings/${id}/complete`, {});
}
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VendorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchVendors(filters: any) {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params = params.set(key, filters[key]);
    });
    return this.http.get<any>(`${this.apiUrl}/vendors/search`, { params });
  }

  getVendorById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/vendors/${id}`);
  }

  getVendorServices(vendorId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/services/vendor/${vendorId}`);
  }

  getVendorReviews(vendorId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/vendor/${vendorId}`);
  }

  getMyProfile() {
    return this.http.get<any>(`${this.apiUrl}/vendors`);
  }

  createProfile(data: any) {
    return this.http.post<any>(`${this.apiUrl}/vendors`, data);
  }

  updateProfile(data: any) {
    return this.http.put<any>(`${this.apiUrl}/vendors`, data);
  }

  createService(data: any) {
    return this.http.post<any>(`${this.apiUrl}/services`, data);
  }

  getMyServices() {
    return this.http.get<any[]>(`${this.apiUrl}/services/my`);
  }

  updateService(id: string, data: any) {
    return this.http.put<any>(`${this.apiUrl}/services/${id}`, data);
  }

  deleteService(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/services/${id}`);
  }
}
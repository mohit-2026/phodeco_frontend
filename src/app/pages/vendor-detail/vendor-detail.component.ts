import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.scss']
})
export class VendorDetailComponent implements OnInit {
  vendor: any = null;
  services: any[] = [];
  reviews: any[] = [];
  selectedService: any = null;

  loading = false;
  bookingLoading = false;
  bookingSuccess = '';
  bookingError = '';
  showBookingForm = false;

  bookingForm = this.fb.group({
    eventDate: ['', Validators.required],
    message:   ['']
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private vendorService: VendorService,
    private bookingService: BookingService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadVendor(id);
  }

  loadVendor(id: string) {
    this.loading = true;

    this.vendorService.getVendorById(id).subscribe({
      next: (vendor) => {
        this.vendor = vendor;
        this.loading = false;
        this.loadServices(vendor._id);
        this.loadReviews(vendor._id);
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/vendors']);
      }
    });
  }

  loadServices(vendorId: string) {
    this.vendorService.getVendorServices(vendorId).subscribe({
      next: (services) => this.services = services
    });
  }

  loadReviews(vendorId: string) {
    this.vendorService.getVendorReviews(vendorId).subscribe({
      next: (reviews) => this.reviews = reviews
    });
  }

  selectService(service: any) {
    this.selectedService = service;
    this.showBookingForm = true;
    this.bookingSuccess = '';
    this.bookingError = '';
  }

  submitBooking() {
    if (this.bookingForm.invalid || !this.selectedService) return;
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.bookingLoading = true;
    this.bookingError = '';
    this.bookingSuccess = '';

    const payload = {
      vendorId:  this.vendor._id,
      serviceId: this.selectedService._id,
      eventDate: this.bookingForm.value.eventDate,
      message:   this.bookingForm.value.message
    };

    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        this.bookingSuccess = 'Booking request sent! The vendor will confirm shortly.';
        this.bookingLoading = false;
        this.bookingForm.reset();
        this.showBookingForm = false;
      },
      error: (err: any) => {
        this.bookingError = err.error?.message || 'Booking failed. Please try again.';
        this.bookingLoading = false;
      }
    });
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}